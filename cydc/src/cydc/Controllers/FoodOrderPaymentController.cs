using cydc.Models;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Controllers
{
    public class FoodOrderPaymentController : Controller
    {
        private readonly ApplicationDbContext _adc;

        public async Task<object> List(FoodOrderPaymentQuery query)
        {
            return await _adc.FoodOrderPayments.CreatePagedList(query);
        }

        public async Task<object> Add()
        {
            
            FoodOrderPayment foodOrserPayment = new FoodOrderPayment
            {
                PayedTime = DateTime.Now
            };

            _adc.Add(foodOrserPayment);
            return await _adc.SaveChangesAsync();
        }
    }
}
