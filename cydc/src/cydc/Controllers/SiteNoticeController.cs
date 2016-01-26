using cydc.Models;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Controllers
{
    public class SiteNoticeController : CydcBaseController
    {
        [FromServices]
        public ApplicationDbContext DBContext { get; set; }

        public async Task<object> GetSiteNotice()
        {
            var data = await DBContext.SiteNotices.FirstOrDefaultAsync() ?? new SiteNotice();
            return data;
        }

        [Authorize(Roles = Admin)]
        public async Task<int> Update([FromBody]SiteNotice notice)
        {
            var dbNotice = DBContext.SiteNotices.FirstOrDefault();
            if (dbNotice != null)
            {
                dbNotice.Content = notice.Content;
            }
            else
            {
                dbNotice = notice;
                DBContext.Entry(dbNotice).State = Microsoft.Data.Entity.EntityState.Added;
            }
            
            return await DBContext.SaveChangesAsync();
        }
    }
}
