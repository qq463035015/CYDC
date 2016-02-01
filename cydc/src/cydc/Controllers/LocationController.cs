using cydc.Models;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Controllers
{
    public class LocationController : CydcBaseController
    {
        [FromServices]
        public ApplicationDbContext DbContext { get; set; }

        public async Task<object> List([FromBody] LocationQuery query)
        {
            IQueryable<Location> data = DbContext.Locations;

            if (query.Name != null)
            {
                data = data.Where(x => x.Name.Contains(query.Name));
            }

            return await data.CreatePagedList(query);
        }

        public object LocationDropdownList(LocationQuery query)
        {
            IQueryable<Location> data = DbContext.Locations;
            return data.CreateList(query);
        }

        [Authorize(Roles = Admin)]
        public async Task<int> ToggleEnable([FromBody] Location location)
        {
            var data = await DbContext.Locations.SingleAsync(x => x.Id == location.Id);
            data.Enabled = location.Enabled;
            return await DbContext.SaveChangesAsync();
        }

        [Authorize(Roles = Admin)]
        public async Task<int> Create([FromBody] Location location)
        {
            DbContext.Add(location);
            return await DbContext.SaveChangesAsync();
        }

        [Authorize(Roles = Admin)]
        public async Task<int> Delete([FromBody]Location location)
        {
            DbContext.Remove(location);
            return await DbContext.SaveChangesAsync();
        }
    }
}
