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
        private readonly ApplicationDbContext _adc;

        public FoodMenuController(ApplicationDbContext adc)
        {
            _adc = adc;
        }

        public async Task<object> List(FoodMenuQuery query)
        {
            return await _adc.FoodMenus.CreatePagedList(query);
        }

        public async Task<int> Add(string title, string details, decimal price)
        {
            FoodMenu foodMenu = new FoodMenu
            {
                Title = title,
                Details = details,
                Price = price,
                Enabled = true
            };
            _adc.Add(foodMenu);
            return await _adc.SaveChangesAsync();
        }

        public async Task<object> Delete(int id)
        {
            FoodMenu foodMenu = new FoodMenu
            {
                Id = id
            };
            _adc.Remove(foodMenu);
            return await _adc.SaveChangesAsync();
        }

        public async Task<object> Enabled(int id, bool enabled)
        {
            FoodMenu foodMenu = new FoodMenu
            {
                Id = id,
                Enabled = enabled
            };
            _adc.Update(foodMenu);
            return await _adc.SaveChangesAsync();
        }
    }
}
