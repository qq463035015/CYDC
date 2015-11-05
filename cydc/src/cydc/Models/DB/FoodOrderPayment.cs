using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class FoodOrderPayment
    {
        [Key]
        public int FoodOrderId { get; set; }

        public DateTime PayedTime { get; set; }

        public FoodOrder FoodOrder { get; set; }
    }
}
