﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class LocationQuery : BasePagedDbQuery
    {
        public string Name { get; set; }
    }
}
