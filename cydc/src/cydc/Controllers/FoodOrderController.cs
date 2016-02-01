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
                .OrderByDescending(x => x.OrderTime)
                .Include(x => x.FoodMenu)
                .Include(x => x.Location)
                .Include(x => x.Taste)
                .Include(x => x.OrderUser);
            if (query.Time != null)
            {
                data = data.Where(x => FormatDate(x.OrderTime) == FormatDate(query.Time));
            }
            if (query.OnlyMe)
            {
                data = data.Where(x => x.OrderUserId == HttpContext.User.GetUserId());
            }
            return await data.CreatePagedList(query);
        }

        [Authorize(Roles = Admin)]
        public async Task<object> List([FromBody] FoodOrderQuery query)
        {
            IQueryable<FoodOrder> data = GetFoodOrderList(query);
            return await data.CreatePagedList(query);
        }

        [Authorize(Roles = Admin)]
        public FileStreamResult Export(FoodOrderQuery query)
        {
            var data = GetFoodOrderList(query).ToList();
            var list = FoodOrderExcelDto.FromEntities(data);
            return ExcelFile(
                ExcelManager.ExportToStream(list),
                $"{DateTime.Now.ToString("yyyy-MM-dd")}.xlsx");
        }

        private IQueryable<FoodOrder> GetFoodOrderList(FoodOrderQuery query)
        {
            query = query ?? new FoodOrderQuery();

            IQueryable<FoodOrder> data = DbContext.FoodOrders
                            .OrderByDescending(x => x.OrderTime)
                            .Include(x => x.FoodMenu)
                            .Include(x => x.Location)
                            .Include(x => x.Taste)
                            .Include(x => x.OrderUser);
            if (query.Time != null)
            {
                data = data.Where(x => FormatDate(x.OrderTime) == FormatDate(query.Time));
            }
            if (query.UserName != "" && query.UserName != null)
            {
                var userId = DbContext.Users.First(x => x.UserName == query.UserName).Id;
                data = data.Where(x => x.OrderUserId == userId);
            }

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

            order.AccountDetails = new AccountDetails
            {
                UserId = User.GetUserId(),
                CreateTime = dateNow,
                Amount = FoodMenuList[0].Price * -1
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
    }
}
