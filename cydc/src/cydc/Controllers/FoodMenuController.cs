using cydc.Models;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Controllers
{
    public class FoodMenuController : CydcBaseController
    {
        [FromServices]
        public ApplicationDbContext DBContext { get; set; }

        public object List(FoodMenuQuery query)
        {
            IQueryable<FoodMenu> data = DBContext.FoodMenus;
            return data.CreateList(query);
        }

        public async Task<int> Create([FromBody]FoodMenu menu)
        {
            menu.Enabled = true;
            DBContext.Add(menu);
            return await DBContext.SaveChangesAsync();
        }

        public async Task<object> Delete([FromBody]FoodMenu menu)
        {
            DBContext.Remove(menu);
            return await DBContext.SaveChangesAsync();
        }

        public async Task<object> UpdateEnable([FromBody]FoodMenu menu)
        {
            var data = DBContext.FoodMenus.Single(x => x.Id == menu.Id);
            data.Enabled = menu.Enabled;
            DBContext.Update(data);
            return await DBContext.SaveChangesAsync();
        }
    }
}
