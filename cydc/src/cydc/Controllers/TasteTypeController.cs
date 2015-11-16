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
        private readonly ApplicationDbContext _adc;

        public async Task<object> List(TasteTypeQuery query)
        {
            return await _adc.TasteTypes.CreatePagedList(query);
        }

        public async Task<int> Add(string name)
        {
            TasteType tasteType = new TasteType
            {
                Name=name
            };
            _adc.Add(tasteType);
            return await _adc.SaveChangesAsync();
        }

        public async Task<int> Delete(int id)
        {
            TasteType tasteType = new TasteType
            {
                Id = id
            };
            _adc.Remove(tasteType);
            return await _adc.SaveChangesAsync();
        }
    }
}
