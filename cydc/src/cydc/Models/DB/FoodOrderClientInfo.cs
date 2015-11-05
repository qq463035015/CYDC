using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class FoodOrderClientInfo
    {
        [Key]
        public int FoodOrderId { get; set; }

        [MaxLength(15)]
        [Required]
        public string IP { get; set; }

        [Required]
        public string UserAgent { get; set; }

        public FoodOrder FoodOrder { get; set; }
    }
}
