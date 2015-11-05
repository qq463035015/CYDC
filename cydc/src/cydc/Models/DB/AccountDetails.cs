using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class AccountDetails
    {
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }

        public decimal Amount { get; set; }

        public int? FoodOrderId { get; set; }

        public DateTime CreateTime { get; set; }

        public ApplicationUser User { get; set; }

        public FoodOrder FoodOrder { get; set; }
    }
}
