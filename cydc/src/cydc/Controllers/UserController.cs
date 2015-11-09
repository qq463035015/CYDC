using cydc.Models;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class UserController: Controller
    {
        private readonly ApplicationDbContext _adc;

        public async Task<decimal> Money()
        {
            return await _adc.AccountDetails.ToAsyncEnumerable().Where(x => x.UserId == HttpContext.User.GetUserId()).Sum(x => x.Amount);
        }
    }
}
