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
            IQueryable<ApplicationUser> data = DbContext.Users
                .Include(x => x.AccountDetails);

            if (!string.IsNullOrWhiteSpace(query.UserName))
            {
                data = data.Where(x => x.NormalizedUserName.StartsWith(query.UserName));
            }

            var result = data.Select(x => new
            {
                Id = x.Id, 
                UserName = x.UserName, 
                Total = x.AccountDetails.Sum(a => a.Amount)
            });

            if (query.Interval == AmountInterval.Eq0)
            {
                result = result.Where(x => x.Total == 0);
            }
            else if (query.Interval == AmountInterval.Lt0)
            {
                result = result.Where(x => x.Total < 0);
            }
            else if (query.Interval == AmountInterval.Gt0)
            {
                result = result.Where(x => x.Total > 0);
            }

            return await result.CreatePagedList(query);
        }

        public object GetUserAmount()
        {
            IQueryable<AccountDetails> data = DbContext.AccountDetails;
            var userId = User.GetUserId();
            var amount = data.Where(x => x.UserId == userId).Sum(x => x.Amount);
            return amount;
        }

        public class UserInfo
        {
            public string UserId { get; set; }

            public string UserName { get; set; }

            public decimal Total { get; set; }
        }
    }
}
