using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class FoodOrderQuery : BasePagedQuery
    {
        public DateTime? Time { get; set; }

        public bool OnlyMe { get; set; }
    }
}
