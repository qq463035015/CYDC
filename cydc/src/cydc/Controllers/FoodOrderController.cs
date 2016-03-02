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
            if (query.StartTime != null)
            {
                var start = query.StartTime.Value.Date;
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
                .OrderBy(x => x.TasteId)
                .ThenBy(x => x.LocationId)
                .ToListAsync();
            IEnumerable<FoodOrderExcelDto> list = FoodOrderExcelDto.FromEntities(data);
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
            if (query.StartTime != null)
            {
                var start = query.StartTime.Value.Date;
                var end = start.AddDays(1);
                if (query.EndTime != null)
                    end = query.EndTime.Value.Date.AddDays(1);
                data = data.Where(x => x.OrderTime >= start && x.OrderTime < end);
            }
            if (!string.IsNullOrWhiteSpace(query.UserName))
            {
                data = data.Where(x => x.OrderUser.UserName.StartsWith(query.UserName));
            }
            data = data.OrderByDescending(x => x.OrderTime);
            return data;
        }

        public async Task<int> Create([FromBody] FoodOrderParams order)
        {
            FoodOrder foodOrder = new FoodOrder();
            var menu = await DbContext.FoodMenus.SingleAsync(x => x.Id == order.FoodMenuId);
            var dateNow = DateTime.Now;
            var connection = (IHttpConnectionFeature)HttpContext.Features[typeof(IHttpConnectionFeature)];

            foodOrder.ClientInfo = new FoodOrderClientInfo
            {
                IP = connection?.RemoteIpAddress?.ToString() ?? "N/A",
                UserAgent = Request.Headers["User-Agent"]
            };

            var userName = order.UserName;
            var userId = "";
            if (!string.IsNullOrEmpty(userName))
            {
                userId = DbContext.Users.First(x => x.UserName == userName).Id;
            }
            else {
                userId = User.GetUserId();
            }

            IQueryable<AccountDetails> data = DbContext.AccountDetails;
            var amount = data.Where(x => x.UserId == userId).Sum(x => x.Amount);

            foodOrder.AccountDetails.Add(new AccountDetails
            {
                UserId = userId,
                CreateTime = dateNow,
                Amount = -menu.Price
            });

            foodOrder.OrderUserId = userId;
            foodOrder.OrderTime = dateNow;
            foodOrder.LocationId = order.LocationId;
            foodOrder.FoodMenuId = order.FoodMenuId;
            foodOrder.TasteId = order.TasteId;
            foodOrder.Comment = order.Comment;
            DbContext.Add(foodOrder);
            await DbContext.SaveChangesAsync();

            if (amount >= menu.Price)
            {
                return await AutoPay(foodOrder);
            }
            else
            {
                return 0;
            }
        }

        [Authorize(Roles = Admin)]
        public async Task<int> Delete([FromBody] FoodOrder dataIn)
        {
            var order = await DbContext.FoodOrders
                .Include(x => x.AccountDetails)
                .Include(x => x.Payment)
                .FirstAsync(x => x.Id == dataIn.Id);
            DbContext.RemoveRange(order.AccountDetails);
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
                UserId = order.OrderUserId,
                CreateTime = DateTime.Now,
                Amount = order.FoodMenu.Price,
            });
            return await DbContext.SaveChangesAsync();
        }

        public async Task<int> AutoPay([FromBody] FoodOrder order)
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
                UserId = order.OrderUserId,
                CreateTime = DateTime.Now,
                Amount = 0,
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
                UserId = order.OrderUserId,
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
