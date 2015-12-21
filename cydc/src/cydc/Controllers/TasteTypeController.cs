using cydc.Models;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Controllers
{
    public class TasteTypeController : CydcBaseController
    {
        [FromServices]
        public ApplicationDbContext DBContext { get; set; }

        public async Task<object> List([FromBody] TasteTypeQuery query)
        {
            IQueryable<TasteType> data = DBContext.TasteTypes;
            if (query.Name != null)
            {
                data = data.Where(x => x.Name.Contains(query.Name));
            }

            return await data.CreatePagedList(query);
        }

        public object TasteTypeDDl(TasteTypeQuery query)
        {
            IQueryable<TasteType> data = DBContext.TasteTypes;
            return data.CreateList(query);
        }


        public async Task<int> Create([FromBody]TasteType type)
        {
            DBContext.Add(type);
            return await DBContext.SaveChangesAsync();
        }

        public async Task<int> Delete([FromBody]TasteType type)
        {
            DBContext.Remove(type);
            return await DBContext.SaveChangesAsync();
        }
    }
}
