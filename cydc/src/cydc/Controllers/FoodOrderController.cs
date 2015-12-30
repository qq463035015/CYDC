﻿using cydc.Models;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNet.Identity;
using Microsoft.Data.Entity;

namespace cydc.Controllers
{
    public class FoodOrderController : CydcBaseController
    {
        [FromServices]
        public ApplicationDbContext DbContext { get; set; }

        public async Task<object> HistoryList([FromBody] FoodOrderQuery query)
        {
            IQueryable<FoodOrder> data = DbContext.FoodOrders.Include(x => x.FoodMenu).Include(x => x.Location).Include(x => x.Taste);
            if (query.Time != null)
            {
                data = data.Where(x => FormatDateTime(x.OrderTime) == FormatDateTime(query.Time));
            }
            if (query.OnlyMe)
            {
                data = data.Where(x => x.OrderUserId == HttpContext.User.GetUserId());
            }
            return await data.CreatePagedList(query);
        }

        public async Task<object> List([FromBody] FoodOrderQuery query)
        {
            IQueryable<FoodOrder> data = DbContext.FoodOrders.Include(x => x.FoodMenu).Include(x => x.Location).Include(x => x.Taste);
            if (query.Time != null)
            {
                data = data.Where(x => FormatDateTime(x.OrderTime) == FormatDateTime(query.Time));
            }
            if (query.UserName != null)
            {
                data = data.Where(x => x.OrderUserId == HttpContext.User.GetUserName());
            }
            return await data.CreatePagedList(query);
        }

        public async Task<int> Create([FromBody] FoodOrder order)
        {
            order.OrderUserId = "2";
            order.OrderTime = DateTime.Parse(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));

            DbContext.Add(order);
            return await DbContext.SaveChangesAsync();
        }

        public async Task<int> Delete([FromBody] FoodOrder order)
        {
            DbContext.Remove(order);
            return await DbContext.SaveChangesAsync();
        }

        public string FormatDateTime(DateTime? dt)
        {
            return dt?.ToString("yyyy-MM-dd");
        }
    }
}
