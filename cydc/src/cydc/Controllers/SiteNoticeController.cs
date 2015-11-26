using cydc.Models;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Controllers
{
    public class SiteNoticeController : Controller
    {
        [FromServices]

        public ApplicationDbContext DBContext { get; set; }

        public object List(SiteNoticeQuery query)
        {
            IQueryable<SiteNotice> data = DBContext.SiteNotices;
            return data.CreateList(query);
        }

        public async Task<int> Update(int id, string content)
        {
            SiteNotice siteNotice = new SiteNotice
            {
                Id = id,
                Content = content
            };
            DBContext.Update(siteNotice);
            return await DBContext.SaveChangesAsync();
        }
    }
}
