﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class ForgotPasswordDto
    {
        [EmailAddress]
        public string Email { get; set; }
    }
}
