using cydc.Models;
using cydc.Models.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Controllers
{
    public class SiteNoticeController
    {
        private readonly ApplicationDbContext _adc;

        public async Task<object> List(SiteNoticeQuery query)
        {
            return await _adc.SiteNotices.CreatePagedList(query);
        }

        public async Task<int> UpdateSiteNotice(int id) {
            SiteNotice siteNotice = new SiteNotice
            {
                Id = id
            };
            _adc.Update(siteNotice);
            return await _adc.SaveChangesAsync();
        }
    }
}
