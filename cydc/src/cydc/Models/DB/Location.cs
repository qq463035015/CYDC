using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class Location
    {
        public int Id { get; set; }

        public bool Enabled { get; set; }

        [Required]
        [MaxLength(15)]
        public string Name { get; set; }
    }
}
