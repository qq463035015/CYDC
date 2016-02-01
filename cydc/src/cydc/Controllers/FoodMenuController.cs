using cydc.Models;
using Microsoft.AspNet.Authorization;
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

        public async Task<object> List([FromBody] FoodMenuQuery query)
        {
            IQueryable<FoodMenu> data = DBContext.FoodMenus.OrderByDescending(x => x.Enabled);
            return await data.CreatePagedList(query);
        }

        public object EnableList(FoodMenuQuery query)
        {
            IQueryable<FoodMenu> data = DBContext.FoodMenus;
            data = data.Where(x => x.Enabled == true);
            return data.CreateList(query);
        }

        [Authorize(Roles = Admin)]
        public async Task<int> Create([FromBody]FoodMenu menu)
        {
            menu.Enabled = true;
            DBContext.Add(menu);
            return await DBContext.SaveChangesAsync();
        }

        [Authorize(Roles = Admin)]
        public async Task<object> Delete([FromBody]FoodMenu menu)
        {
            DBContext.Remove(menu);
            return await DBContext.SaveChangesAsync();
        }

        [Authorize(Roles = Admin)]
        public async Task<object> UpdateEnable([FromBody]FoodMenu menu)
        {
            var data = DBContext.FoodMenus.Single(x => x.Id == menu.Id);
            data.Enabled = menu.Enabled;
            DBContext.Update(data);
            return await DBContext.SaveChangesAsync();
        }
    }
}
