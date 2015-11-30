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
    public class UserController: CydcBaseController
    {
        [FromServices]
        public ApplicationDbContext DbContext { get; set; }

        public async Task<decimal> Money()
        {
            return await DbContext.AccountDetails.ToAsyncEnumerable().Where(x => x.UserId == HttpContext.User.GetUserId()).Sum(x => x.Amount);
        }
    }
}
