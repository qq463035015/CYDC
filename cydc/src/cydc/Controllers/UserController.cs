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

        public async Task<object> List([FromBody] AccountDetailsQuery query)
        {
            IQueryable<AccountDetails> data = DbContext.AccountDetails;
            if (query.UserName != "" && query.UserName != null)
            {
                var userId = DbContext.Users.First(x => x.UserName == query.UserName).Id;
                data = data.Where(x => x.UserId == userId);
            }

            var result = data.GroupBy(x => x.UserId).Select(x => new
            {
                UserId = x.Key,
                UserName = DbContext.Users.First(u => u.Id == x.Key).UserName,
                Total = x.Sum(s => s.Amount)
            });
            return await result.CreatePagedList(query);
        }

        public class UserInfo
        {
            public string UserId { get; set; }

            public string UserName { get; set; }

            public decimal Total { get; set; }
        }
    }
}
