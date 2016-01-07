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

namespace cydc.Controllers
{
    public class FoodOrderController : CydcBaseController
    {
        [FromServices]
        public ApplicationDbContext DbContext { get; set; }

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

        public async Task<object> List([FromBody] FoodOrderQuery query)
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
            if (query.UserName != null)
            {
                var userId = DbContext.Users.First(x => x.UserName == query.UserName).Id;
                data = data.Where(x => x.OrderUserId == userId);
            }
            return await data.CreatePagedList(query);
        }

        [Authorize]
        public async Task<int> Create([FromBody] FoodOrder order)
        {
            var FoodMenuList = DbContext.FoodMenus.Where(x => x.Id == order.FoodMenuId).ToList();
            var dateNow = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            order.OrderUserId = User.GetUserId();
            order.OrderTime = dateNow;

            order.ClientInfo = new FoodOrderClientInfo
            {
                IP = Request.Headers["X-Forwarded-For"],
                UserAgent = Request.Headers["User-Agent"]
            };

            order.AccountDetails = new AccountDetails
            {
                UserId = User.GetUserId(),
                CreateTime = dateNow,
                Amount = FoodMenuList[0].Price * -1
            };

            DbContext.Add(order);
            return await DbContext.SaveChangesAsync();
        }

        public async Task<int> Delete([FromBody] FoodOrder order)
        {
            DbContext.Remove(order);
            return await DbContext.SaveChangesAsync();
        }
    }
}
