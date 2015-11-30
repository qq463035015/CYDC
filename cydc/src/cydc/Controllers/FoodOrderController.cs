using cydc.Models;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNet.Identity;

namespace cydc.Controllers
{
    public class FoodOrderController : CydcBaseController
    {
        [FromServices]
        public ApplicationDbContext DbContext { get; set; }

        public async Task<object> HistoryList(FoodOrderQuery query)
        {
            IQueryable<FoodOrder> data = DbContext.FoodOrders;
            if (query.Time != null)
            {
                data = data.Where(x => x.OrderTime == query.Time.Value);
            }
            if (query.OnlyMe)
            {
                data = data.Where(x => x.OrderUserId == HttpContext.User.GetUserId());
            }
            return await data.CreatePagedList(query);
        }

        public async Task<object> List(FoodOrderQuery query)
        {
            IQueryable<FoodOrder> data = DbContext.FoodOrders;
            if (query.Time != null)
            {
                data = data.Where(x => x.OrderTime == query.Time.Value);
            }
            if (query.UserName != null)
            {
                data = data.Where(x => x.OrderUserId == HttpContext.User.GetUserName());
            }
            return await data.CreatePagedList(query);
        }

        public async Task<int> Add(int foodMenuId, int tasteId, int locationId, string comment)
        {
            FoodOrder foodOrder = new FoodOrder
            {
                OrderUserId = HttpContext.User.GetUserId(),
                OrderTime = DateTime.Now,
                
                FoodMenuId = foodMenuId,
                TasteId = tasteId,
                OrderLocationId = locationId,
                Comment = comment
            };
            DbContext.Add(foodOrder);
            return await DbContext.SaveChangesAsync();
        }

        public async Task<int> Delete(int id)
        {
            FoodOrder foodOrder = new FoodOrder
            {
                Id = id
            };
            DbContext.Remove(foodOrder);
            return await DbContext.SaveChangesAsync();
        }
    }
}
