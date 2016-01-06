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
                data = data.Where(x => x.OrderTime == query.Time);
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
                data = data.Where(x => x.OrderTime == query.Time);
            }
            if (query.UserName != null)
            {
                data = data.Where(x => x.OrderUser.UserName == User.GetUserName());
            }
            return await data.CreatePagedList(query);
        }

        [Authorize]
        public async Task<int> Create([FromBody] FoodOrder order)
        {
            var FoodMenuList = DbContext.FoodMenus.Where(x => x.Id == order.FoodMenuId).ToList();

            order.OrderUserId = User.GetUserId();
            order.OrderTime = DateTime.Now;

            order.ClientInfo = new FoodOrderClientInfo
            {
                IP = Request.Headers["X-Forwarded-For"],
                UserAgent = Request.Headers["User-Agent"]
            };

            order.AccountDetails = new AccountDetails
            {
                UserId = User.GetUserId(),
                CreateTime = DateTime.Now,
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
