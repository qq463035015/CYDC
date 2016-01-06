using cydc.Models;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace cydc.Controllers
{
    public class UserController : CydcBaseController
    {
        [FromServices]
        public ApplicationDbContext DbContext { get; set; }

        public decimal UserSumMoney()
        {
            return 1;
            //return DbContext.AccountDetails.GroupBy(x => x.UserId).Select(y => new { y.Sum(s => s.Amount) });
        }
    }
}
