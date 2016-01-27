using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class ChangePasswordDto
    {
        [Required]
        public string Password { get; set; }

        [Required]
        [MinLength(6)]
        public string NewPassword { get; set; }

        [Compare("NewPassword", ErrorMessage = "PASSWORD_MUST_BE_SAME")]
        public string ConfirmedPassword { get; set; }
    }
}
