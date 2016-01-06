using cydc.Migrations;
using cydc.Models;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Data.Entity;

namespace cydc.Controllers
{
    public class AccountDetailsController : CydcBaseController
    {
        [FromServices]
        public ApplicationDbContext DbContext { get; set; }

        public async Task<object> List([FromBody]AccountDetailsQuery query)
        {
            IQueryable<AccountDetails> data = DbContext.AccountDetails
                .Include(x => x.User);
            if (query.UserName != null)
            {
                data = data.Where(x => x.User.UserName == query.UserName);
            }
            return await data.CreatePagedList(query);
        }

        public async Task<int> Create([FromBody] AccountDetails account)
        {
            account.CreateTime = DateTime.Now;
            DbContext.Add(account);
            return await DbContext.SaveChangesAsync();
        }
    }
}
