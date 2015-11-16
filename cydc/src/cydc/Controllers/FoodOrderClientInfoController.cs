using cydc.Models;
using Microsoft.AspNet.Http.Features;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Controllers
{
    public class FoodOrderClientInfoController : Controller
    {
        private readonly ApplicationDbContext _adc;
        public async Task<int> Add()
        {
            FoodOrderClientInfo foodOrderClientInfo = new FoodOrderClientInfo
            {
                UserAgent = Request.Headers["User-Agent"]
            };
            _adc.Add(foodOrderClientInfo);
            return await _adc.SaveChangesAsync();
        }
    }
}
