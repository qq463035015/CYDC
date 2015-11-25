using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class BasePagedDbQuery : BaseDbQuery
    {
        public int? Page { get; set; }

        public int? PageSize { get; set; }

        public const int DefaultPageSize = 12;

        public InternalPagedDbQuery ToPagedDbQuery()
        {
            var negociatedPage = Page.HasValue ? Page.Value : 1;
            var negociatedPageSize = PageSize.HasValue ? PageSize.Value : DefaultPageSize;
            var negociatedAsc = Asc.HasValue ? Asc.Value : false;

            return new InternalPagedDbQuery
            {
                Skip = (negociatedPage - 1) * negociatedPageSize, 
                Take = negociatedPageSize, 
                OrderBy = OrderBy,
                Asc = negociatedAsc
            };
        }
    }

    public class BaseDbQuery
    {
        public string OrderBy { get; set; }

        public bool? Asc { get; set; }

        public InternalDbQuery ToDbQuery()
        {
            var negociatedAsc = Asc.HasValue ? Asc.Value : false;

            return new InternalPagedDbQuery
            {
                OrderBy = OrderBy,
                Asc = negociatedAsc
            };
        }
    }

    public class InternalPagedDbQuery : InternalDbQuery
    {
        public int Skip { get; set; }

        public int Take { get; set; }
    }

    public class InternalDbQuery
    {
        public string OrderBy { get; set; }

        public bool Asc { get; set; }

        public string ToSortString()
        {
            if (OrderBy != null)
            {
                return OrderBy + " " + (Asc ? "asc" : "desc");
            }
            else
            {
                return null;
            }
        }
    }
}
