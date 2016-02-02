using cydc.Migrations;
using cydc.Models;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Data.Entity;
using Microsoft.AspNet.Authorization;

namespace cydc.Controllers
{
    public class AccountDetailsController : CydcBaseController
    {
        [FromServices]
        public ApplicationDbContext DbContext { get; set; }

        [Authorize(Roles = Admin)]
        public async Task<object> List([FromBody]AccountDetailsQuery query)
        {
            IQueryable<AccountDetails> data = DbContext.AccountDetails
                .OrderByDescending(x => x.CreateTime)
                .Include(x => x.User);
            if (!string.IsNullOrEmpty(query.UserName))
            {
                var userId = DbContext.Users.First(x => x.UserName == query.UserName).Id;
                data = data.Where(x => x.UserId == userId);
            }
            return await data.CreatePagedList(query);
        }

        [Authorize(Roles = Admin)]
        public async Task<int> Create([FromBody] AccountDetails account)
        {
            account.CreateTime = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            DbContext.Add(account);
            return await DbContext.SaveChangesAsync();
        }
    }
}
