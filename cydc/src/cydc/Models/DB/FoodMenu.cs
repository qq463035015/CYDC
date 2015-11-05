using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace cydc.Models
{
    public class FoodMenu
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(10)]
        public string Title { get; set; }

        [Required]
        [MaxLength(50)]
        public string Details { get; set; }

        public decimal Price { get; set; }

        public bool Enabled { get; set; }
    }
}
