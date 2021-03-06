﻿using cydc.Models;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
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

        public object EnabledTasteTypes(TasteTypeQuery query)
        {
            IQueryable<TasteType> data = DBContext.TasteTypes.Where(x => x.Enabled == true);
            return data.CreateList(query);
        }

        [Authorize(Roles = Admin)]
        public async Task<int> Create([FromBody]TasteType type)
        {
            DBContext.Add(type);
            return await DBContext.SaveChangesAsync();
        }

        [Authorize(Roles = Admin)]
        public async Task<int> Delete([FromBody]TasteType type)
        {
            DBContext.Remove(type);
            return await DBContext.SaveChangesAsync();
        }

        [Authorize(Roles = Admin)]
        public async Task<int> ToggleEnable([FromBody]TasteType type)
        {
            var data = await DBContext.TasteTypes.SingleAsync(x => x.Id == type.Id);
            data.Enabled = type.Enabled;
            return await DBContext.SaveChangesAsync();
        }
    }
}
