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
    public class FoodOrderController : Controller
    {
        private readonly ApplicationDbContext _adc;

        public async Task<object> List(FoodOrderQuery query)
        {
            IQueryable<FoodOrder> data = _adc.FoodOrders;
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
        
    }
}
