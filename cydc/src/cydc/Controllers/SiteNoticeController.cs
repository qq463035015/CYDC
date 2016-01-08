using cydc.Models;
using Microsoft.AspNet.Mvc;
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

        public object GetSiteNotice()
        {
            IQueryable<SiteNotice> data = DBContext.SiteNotices;
            return data;
        }

        public async Task<int> Update([FromBody]SiteNotice notice)
        {
            DBContext.Update(notice);
            return await DBContext.SaveChangesAsync();
        }
    }
}
