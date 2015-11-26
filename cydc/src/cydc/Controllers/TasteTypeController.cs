using cydc.Models;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Controllers
{
    public class TasteTypeController : Controller
    {
        [FromServices]
        public ApplicationDbContext DBContext { get; set; }

        public object List(TasteTypeQuery query)
        {
            IQueryable<TasteType> data = DBContext.TasteTypes;
            if (query.Name != null)
            {
                data = data.Where(x => x.Name.Contains(query.Name));
            }

            return data.CreateList(query);
        }

        public async Task<int> Install(string name)
        {
            TasteType tasteType = new TasteType
            {
                Name = name
            };
            DBContext.Add(tasteType);
            return await DBContext.SaveChangesAsync();
        }

        public async Task<int> Delete(int id)
        {
            TasteType tasteType = new TasteType
            {
                Id = id
            };
            DBContext.Remove(tasteType);
            return await DBContext.SaveChangesAsync();
        }
    }
}
