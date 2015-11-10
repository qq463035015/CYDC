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
        private readonly ApplicationDbContext _adc;

        public async Task<object> List(LocationQuery query)
        {
            return await _adc.Locations.CreatePagedList(query);
        }

        public async Task<int> Add(string name)
        {
            Location location = new Location
            {
                Name = name
            };
            _adc.Add(location);
            return await _adc.SaveChangesAsync();
        }

        public async Task<int> Delete(int id)
        {
            Location location = new Location
            {
                Id = id
            };
            _adc.Remove(location);
            return await _adc.SaveChangesAsync();
        }
    }
}
