using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [RegularExpression(@"^[\u4e00-\u9fcc]+$")]
        public string UserName { get; set; }

        [MinLength(6)]
        public string Password { get; set; }

        [Compare("Password")]
        public string ConfirmedPassword { get; set; }
    }
}
