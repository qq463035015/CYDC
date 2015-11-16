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
        private readonly ApplicationDbContext _adc;

        public async Task<object> List(SiteNoticeQuery query)
        {
            return await _adc.SiteNotices.CreatePagedList(query);
        }

        public async Task<int> Update(int id, string content)
        {
            SiteNotice siteNotice = new SiteNotice
            {
                Id = id,
                Content = content
            };
            _adc.Update(siteNotice);
            return await _adc.SaveChangesAsync();
        }
    }
}
