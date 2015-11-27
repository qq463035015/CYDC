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

        public async Task<int> Install([FromBody]FoodMenu menu)
        {
            menu.Enabled = true;
            DBContext.Add(menu);
            return await DBContext.SaveChangesAsync();
        }

        public async Task<object> Delete([FromBody]FoodMenu foodMenu)
        {
            DBContext.Remove(foodMenu);
            return await DBContext.SaveChangesAsync();
        }

        public async Task<object> Update([FromBody]FoodMenu foodMenu)
        {
            DBContext.Update(foodMenu);
            return await DBContext.SaveChangesAsync();
        }
    }
}
