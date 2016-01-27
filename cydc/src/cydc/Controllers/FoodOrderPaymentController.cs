using cydc.Models;
using Microsoft.AspNet.Authorization;
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

        public async Task<object> List([FromBody] FoodOrderPaymentQuery query)
        {
            return await DbContext.FoodOrderPayments.CreatePagedList(query);
        }

        [Authorize(Roles = Admin)]
        public async Task<object> Create([FromBody] FoodOrderPayment payment)
        {
            payment.PayedTime = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            DbContext.Add(payment);
            return await DbContext.SaveChangesAsync();
        }
    }
}
