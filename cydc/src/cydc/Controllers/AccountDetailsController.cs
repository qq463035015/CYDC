using cydc.Migrations;
using cydc.Models;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace cydc.Controllers
{
    public class AccountDetailsController : CydcBaseController
    {
        [FromServices]
        public ApplicationDbContext DbContext { get; set; }

        public async Task<object> List(AccountDetailsQuery query)
        {
            IQueryable<AccountDetails> data = DbContext.AccountDetails;
            if (query.UserId != null)
            {
                data = data.Where(x => x.UserId == query.UserId);
            }
            return await data.CreatePagedList(query);
        }

        public async Task<int> Create()
        {
            AccountDetails accountDetails = new AccountDetails
            {
                UserId = User.GetUserId(),
                CreateTime = DateTime.Now
            };
            DbContext.Add(accountDetails);
            return await DbContext.SaveChangesAsync();
        }
    }
}
