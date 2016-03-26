using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Controllers;
using Microsoft.AspNet.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models.Excel
{
    public class ExcelManager
    {
        private readonly IModelMetadataProvider _modelMetadataProvider;

        public ExcelManager(IModelMetadataProvider modelMetadataProvider)
        {
            _modelMetadataProvider = modelMetadataProvider;
        }

        public Stream ExportToStream<T>(IEnumerable<T> dataIn)
        {
            var excelManager = new ExcelExportManager<T>(dataIn, _modelMetadataProvider);
            return excelManager.ExportToStream();
        }
    }
}
