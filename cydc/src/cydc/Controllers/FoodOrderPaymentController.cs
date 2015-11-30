using cydc.Models;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Controllers
{
    public class FoodOrderPaymentController : CydcBaseController
    {
        [FromServices]
        public ApplicationDbContext DbContext { get; set; }

        public async Task<object> List(FoodOrderPaymentQuery query)
        {
            return await DbContext.FoodOrderPayments.CreatePagedList(query);
        }

        public async Task<object> Add()
        {
            
            FoodOrderPayment foodOrserPayment = new FoodOrderPayment
            {
                PayedTime = DateTime.Now
            };

            DbContext.Add(foodOrserPayment);
            return await DbContext.SaveChangesAsync();
        }
    }
}
