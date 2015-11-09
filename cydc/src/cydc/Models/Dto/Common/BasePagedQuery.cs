using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class BasePagedQuery
    {
        public int? Page { get; set; }

        public int? PageSize { get; set; }

        public string OrderBy { get; set; }

        public bool? Asc { get; set; }

        public const int DefaultPageSize = 12;

        public InternalPagedQuery ToDbQuery()
        {
            var negociatedPage = Page.HasValue ? Page.Value : 1;
            var negociatedPageSize = PageSize.HasValue ? PageSize.Value : DefaultPageSize;
            var negociatedAsc = Asc.HasValue ? Asc.Value : false;

            return new InternalPagedQuery
            {
                Skip = (negociatedPage - 1) * negociatedPageSize, 
                Take = negociatedPageSize, 
                OrderBy = OrderBy,
                Asc = negociatedAsc
            };
        }
    }

    public class InternalPagedQuery
    {
        public int Skip { get; set; }

        public int Take { get; set; }

        public string OrderBy { get; set; }

        public bool Asc { get; set; }
    }
}
