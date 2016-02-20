using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class ResetPasswordDto
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [Required]
        public string Code { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [Compare("Password", ErrorMessage = "PASSWORD_MUST_BE_SAME")]
        public string ConfirmedPassword { get; set; }
    }
}