using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Controllers;
using Microsoft.AspNet.Mvc.ModelBinding;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models.Excel
{
    public class ExcelManager
    {
        public string ExportToCsv<T>(IEnumerable<T> dataIn)
        {
            return dataIn.ToCsv();
        }
    }
}
