using Microsoft.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class PagedList<T> where T : class
    {
        public List<T> Items { get; set; }

        public int Count { get; set; }

        private PagedList()
        {
        }

        public static async Task<PagedList<T>> Create(IQueryable<T> data, BasePagedDbQuery query)
        {
            var result = new PagedList<T>();
            var dbQuery = query.ToPagedDbQuery();

            var sortString = dbQuery.ToSortString();
            if (sortString != null)
            {
                data = data.OrderBy(sortString);
            }

            var allItems = await data
                .Skip(dbQuery.Skip).Take(dbQuery.Take)
                .ToListAsync();
            var count = await
                data.CountAsync();

            return new PagedList<T>
            {
                Items = await data.Skip(dbQuery.Skip).Take(dbQuery.Take).ToListAsync().ConfigureAwait(false), 
                Count = await data.CountAsync().ConfigureAwait(false)
            };
        }
    }

    public static class QueryableExtensions
    {
        public static async Task<PagedList<T>> CreatePagedList<T>(this IQueryable<T> data, BasePagedDbQuery query) where T : class
        {
            query = query ?? new BasePagedDbQuery();
            return await PagedList<T>.Create(data, query);
        }

        public static IQueryable<T> CreateList<T>(this IQueryable<T> data, BaseDbQuery query) where T : class
        {
            var internalQuery = query.ToDbQuery();
            var sortString = internalQuery.ToSortString();

            if (sortString != null)
            {
                data = data.OrderBy(sortString);
            }

            return data;
        }
    }
}
