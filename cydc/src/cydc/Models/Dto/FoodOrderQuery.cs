using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class FoodOrderQuery : BasePagedDbQuery
    {
        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public bool OnlyMe { get; set; }

        public string UserName { get; set; }
    }
}
