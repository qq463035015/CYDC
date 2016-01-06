using cydc.Models;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
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

        public async Task<object> List()
        {
            var data = DbContext.AccountDetails
                .GroupBy(x => x.UserId)
                .Select(x => new
                {
                    UserId = x.Key,
                    Total = x.Sum(s => s.Amount)
                }).ToList();
            return data;
        }
        public class UserInfo
        {
            public string UserName { get; set; }

            public decimal Total { get; set; }
        }
    }
}
