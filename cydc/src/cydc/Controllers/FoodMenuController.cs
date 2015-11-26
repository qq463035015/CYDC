using cydc.Models;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Controllers
{
    public class FoodMenuController : Controller
    {
        [FromServices]
        public ApplicationDbContext DBContext { get; set; }

        public object List(FoodMenuQuery query)
        {
            IQueryable<FoodMenu> data = DBContext.FoodMenus;

            return data.CreateList(query);
        }

        public async Task<int> Install(string details, string title, decimal price)
        {
            FoodMenu foodMenu = new FoodMenu
            {
                Title = title,
                Details = details,
                Price = price,
                Enabled = true
            };
            DBContext.Add(foodMenu);
            return await DBContext.SaveChangesAsync();
        }

        public async Task<object> Delete(int id)
        {
            FoodMenu foodMenu = new FoodMenu
            {
                Id = id
            };
            DBContext.Remove(foodMenu);
            return await DBContext.SaveChangesAsync();
        }

        public async Task<object> Update(int id, bool enabled)
        {
            FoodMenu foodMenu = new FoodMenu
            {
                Id = id,
                Enabled = enabled
            };
            DBContext.Update(foodMenu);
            return await DBContext.SaveChangesAsync();
        }
    }
}
