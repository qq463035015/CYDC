﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class TasteTypeQuery:BasePagedDbQuery
    {
        public string Name { get; set; }
    }
}
