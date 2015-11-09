using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class PagedList<T>
    {
        public List<T> Items { get; set; }

        public T NextPageFirstItem { get; set; }

        bool HasNext { get; set; }

        bool HasPrev { get; set; }

        private PagedList()
        {
        }

        public static async Task<PagedList<T>> Create(IQueryable<T> data, BasePagedQuery query)
        {
            var result = new PagedList<T>();
            var dbQuery = query.ToDbQuery();

            var allItemsPlusOne = await data.ToAsyncEnumerable()
                .Skip(dbQuery.Skip).Take(dbQuery.Take + 1)
                .ToList();

            result.NextPageFirstItem = allItemsPlusOne.Last();
            allItemsPlusOne.RemoveAt(allItemsPlusOne.Count - 1);
            result.Items = allItemsPlusOne;
            result.HasPrev = dbQuery.Skip > 1;
            result.HasNext = result.Items.Count > dbQuery.Take;

            return result;
        }
    }

    public static class QueryablePagedExtensions
    {
        public static async Task<PagedList<T>> CreatePagedList<T>(this IQueryable<T> data, BasePagedQuery query)
        {
            return await PagedList<T>.Create(data, query);
        }
    }
}
