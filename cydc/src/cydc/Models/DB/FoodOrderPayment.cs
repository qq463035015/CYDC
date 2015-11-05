using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class FoodOrderPayment
    {
        public int FoodOrderId { get; set; }

        public DateTime PayedTime { get; set; }

        public FoodOrder FoodOrder { get; set; }
    }
}
