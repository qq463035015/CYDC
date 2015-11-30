using cydc.Models;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<int> Add(string userId, decimal account)
        {
            AccountDetails accountDetail = new AccountDetails
            {
                UserId = userId,
                Amount = account,
                CreateTime = DateTime.Now
            };
            DbContext.Add(accountDetail);
            return await DbContext.SaveChangesAsync();
        }
    }
}
