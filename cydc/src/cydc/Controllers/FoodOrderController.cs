using cydc.Models;
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

        public async Task<ActionResult> Create([FromBody] FoodOrder order)
        {
            var FoodMenuList = DbContext.FoodMenus.Where(x => x.Id == order.FoodMenuId).ToList();
            var dateNow = DateTime.Now;
            order.OrderUserId = User.GetUserId();
            order.OrderTime = dateNow;

            var connection = (IHttpConnectionFeature)HttpContext.Features[typeof(IHttpConnectionFeature)];

            order.ClientInfo = new FoodOrderClientInfo
            {
                IP = connection?.RemoteIpAddress?.ToString() ?? "N/A",
                UserAgent = Request.Headers["User-Agent"]
            };

            order.AccountDetails = new List<AccountDetails>
            {
                new AccountDetails {
                    UserId = User.GetUserId(),
                    CreateTime = dateNow,
                    Amount = FoodMenuList[0].Price * -1
                }
            };

            DbContext.Add(order);
            await DbContext.SaveChangesAsync();
            return Ok();
        }

        [Authorize(Roles = Admin)]
        public async Task<int> Delete([FromBody] FoodOrder order)
        {
            order = await DbContext.FoodOrders
                .Include(x => x.AccountDetails)
                .SingleAsync(x => x.Id == order.Id);
            DbContext.Remove(order.AccountDetails);
            DbContext.Remove(order);
            return await DbContext.SaveChangesAsync();
        }

        [Authorize(Roles = Admin)]
        public async Task<int> Pay([FromBody] FoodOrder order)
        {
            order = await DbContext.FoodOrders
                .Include(x => x.Payment)
                .Include(x => x.AccountDetails)
                .SingleAsync(x => x.Id == order.Id);
            order.Payment = new FoodOrderPayment
            {
                PayedTime = DateTime.Now
            };
            return await DbContext.SaveChangesAsync();
        }

        [Authorize(Roles = Admin)]
        public async Task<int> CancelPay([FromBody] FoodOrder order)
        {
            order = await DbContext.FoodOrders
                .Include(x => x.Payment)
                .SingleAsync(x => x.Id == order.Id);
            order.Payment = null;
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
