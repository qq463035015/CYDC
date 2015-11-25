using cydc.Models;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Controllers
{
    public class LocationController : Controller
    {
        [FromServices]
        public ApplicationDbContext DbContext { get; set; }

        public object List(LocationQuery query)
        {
            IQueryable<Location> data = DbContext.Locations;

            if (query.Name != null)
            {
                data = data.Where(x => x.Name.Contains(query.Name));
            }

            return data.CreateList(query);
        }

        public async Task<int> Add(string name)
        {
            Location location = new Location
            {
                Name = name
            };
            DbContext.Add(location);
            return await DbContext.SaveChangesAsync();
        }

        public async Task<int> Delete(int id)
        {
            Location location = new Location
            {
                Id = id
            };
            DbContext.Locations.Remove(location);
            return await DbContext.SaveChangesAsync();
        }
    }
}
