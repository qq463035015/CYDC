﻿using cydc.Models;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNet.Identity;
using Microsoft.Data.Entity;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Http.Features;
using cydc.Models.Excel;

namespace cydc.Controllers
{
    public class FoodOrderController : CydcBaseController
    {
        [FromServices]
        public ApplicationDbContext DbContext { get; set; }

        [FromServices]
        public ExcelManager ExcelManager { get; set; }

        public async Task<object> HistoryList([FromBody] FoodOrderQuery query)
        {
            IQueryable<FoodOrder> data = DbContext.FoodOrders
                .Include(x => x.FoodMenu)
                .Include(x => x.Location)
                .Include(x => x.Taste)
                .Include(x => x.Payment)
                .Include(x => x.OrderUser);
            if (query.Time != null)
            {
                var start = query.Time.Value.Date;
                var end = start.AddDays(1);
                data = data.Where(x => x.OrderTime >= start && x.OrderTime < end);
            }
            if (query.OnlyMe)
            {
                var userId = User.GetUserId();
                data = data.Where(x => x.OrderUserId == userId);
            }
            data = data.OrderByDescending(x => x.OrderTime);
            return await data.CreatePagedList(query);
        }

        [Authorize(Roles = Admin)]
        public async Task<object> List([FromBody] FoodOrderQuery query)
        {
            IQueryable<FoodOrder> data = GetFoodOrderList(query);
            return await data.CreatePagedList(query);
        }

        [Authorize(Roles = Admin)]
        public async Task<FileStreamResult> Export(FoodOrderQuery query)
        {
            var data = await GetFoodOrderList(query)
                .OrderBy(x => x.LocationId)
                .ThenBy(x => x.TasteId)
                .ThenBy(x => x.Comment)
                .ToListAsync();
            var list = FoodOrderExcelDto.FromEntities(data);
            return ExcelFile(
                ExcelManager.ExportToStream(list),
                $"{DateTime.Now.ToString("yyyy-MM-dd")}.xlsx");
        }

        private IQueryable<FoodOrder> GetFoodOrderList(FoodOrderQuery query)
        {
            query = query ?? new FoodOrderQuery();

            IQueryable<FoodOrder> data = DbContext.FoodOrders
                            .Include(x => x.FoodMenu)
                            .Include(x => x.Location)
                            .Include(x => x.Taste)
                            .Include(x => x.Payment)
                            .Include(x => x.OrderUser);
            if (query.Time != null)
            {
                var start = query.Time.Value.Date;
                var end = start.AddDays(1);
                data = data.Where(x => x.OrderTime >= start && x.OrderTime < end);
            }
            if (!string.IsNullOrWhiteSpace(query.UserName))
            {
                data = data.Where(x => x.OrderUser.UserName.StartsWith(query.UserName));
            }
            data = data.OrderByDescending(x => x.OrderTime);
            return data;
        }

        public async Task<int> Create([FromBody] FoodOrder order)
        {
            var menu = await DbContext.FoodMenus.SingleAsync(x => x.Id == order.FoodMenuId);
            var dateNow = DateTime.Now;
            order.OrderUserId = User.GetUserId();
            order.OrderTime = dateNow;

            var connection = (IHttpConnectionFeature)HttpContext.Features[typeof(IHttpConnectionFeature)];

            order.ClientInfo = new FoodOrderClientInfo
            {
                IP = connection?.RemoteIpAddress?.ToString() ?? "N/A",
                UserAgent = Request.Headers["User-Agent"]
            };

            order.AccountDetails.Add(new AccountDetails
            {
                UserId = User.GetUserId(),
                CreateTime = dateNow,
                Amount = menu.Price * -1
            });

            DbContext.Add(order);
            return await DbContext.SaveChangesAsync();
        }

        [Authorize(Roles = Admin)]
        public async Task<int> Delete([FromBody] FoodOrder dataIn)
        {
            var order = await DbContext.FoodOrders
                .Include(x => x.AccountDetails)
                .Include(x => x.Payment)
                .FirstAsync(x => x.Id == dataIn.Id);
            DbContext.Remove(order);
            return await DbContext.SaveChangesAsync();
        }

        [Authorize(Roles = Admin)]
        public async Task<int> Pay([FromBody] FoodOrder order)
        {
            order = await DbContext.FoodOrders
                .Include(x => x.Payment)
                .Include(x => x.AccountDetails)
                .Include(x => x.FoodMenu)
                .SingleAsync(x => x.Id == order.Id);
            order.Payment = new FoodOrderPayment
            {
                PayedTime = DateTime.Now
            };
            order.AccountDetails.Add(new AccountDetails
            {
                UserId = User.GetUserId(),
                CreateTime = DateTime.Now,
                Amount = order.FoodMenu.Price, 
            });
            return await DbContext.SaveChangesAsync();
        }

        [Authorize(Roles = Admin)]
        public async Task<int> CancelPay([FromBody] FoodOrder order)
        {
            order = await DbContext.FoodOrders
                .Include(x => x.Payment)
                .Include(x => x.FoodMenu)
                .Include(x => x.AccountDetails)
                .SingleAsync(x => x.Id == order.Id);
            order.Payment = null;
            order.AccountDetails.Add(new AccountDetails
            {
                UserId = User.GetUserId(), 
                CreateTime = DateTime.Now, 
                Amount = -order.FoodMenu.Price
            });
            return await DbContext.SaveChangesAsync();
        }

        [Authorize(Roles = Admin)]
        public async Task<int> Update([FromBody] FoodOrder order)
        {
            var data = DbContext.FoodOrders.Single(x => x.Id == order.Id);
            data.Comment = order.Comment;
            DbContext.Update(data);
            return await DbContext.SaveChangesAsync();
        }
    }
}
