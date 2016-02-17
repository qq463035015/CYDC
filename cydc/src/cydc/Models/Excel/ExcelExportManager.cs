using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models.Excel
{
    public class ExcelExportManager<T> : IDisposable
    {
        private readonly IEnumerable<T> _dataIn;

        private readonly List<ModelMetadata> _properties;

        private List<string> _titles;

        private readonly ExcelPackage _excel;

        private readonly ExcelWorksheet _sheet;

        private readonly Type _myType;

        public ExcelExportManager(IEnumerable<T> dataIn, IModelMetadataProvider modelMetadataProvider)
        {
            _dataIn = dataIn;

            _myType = typeof(T);
            var modelMetadata = modelMetadataProvider.GetMetadataForType(_myType);
            _properties = modelMetadata.Properties.ToList();

            _excel = new ExcelPackage();
            _sheet = _excel.Workbook.Worksheets.Add(modelMetadata.GetDisplayName());
        }

        public Stream ExportToStream()
        {
            _titles = ExtractHeaders();
            FillHeaders();
            ExtractAndFillBody();
            SetStyles();

            return ExcelToStream();
        }

        private Stream ExcelToStream()
        {
            var stream = new MemoryStream();
            _excel.SaveAs(stream);
            stream.Position = 0;
            return stream;
        }

        private void SetStyles()
        {
            _sheet.Cells[1, 1, 1, _titles.Count].Style.Font.Bold = true;
            _sheet.Cells.AutoFitColumns();
        }

        private void ExtractAndFillBody()
        {
            var bodyStartRow = 2;
            var row = bodyStartRow;

            foreach (var data in _dataIn)
            {
                FillOneRow(row, data);
                row += 1;
            }
        }

        private void FillOneRow(int row, T data)
        {
            var col = 1;
            foreach (var prop in _properties)
            {
                var value = GetDispayValue(prop, data);
                _sheet.Cells[row, col].Value = value;

                col += 1;
            }
        }

        private object GetDispayValue(ModelMetadata metadata, T data)
        {
            var prop = _myType.GetProperty(metadata.PropertyName);
            var value = prop.GetValue(data);

            if (value != null && metadata.DisplayFormatString != null)
            {
                var formatted = string.Format(metadata.DisplayFormatString, value);
                return formatted;
            }
            else if (value is DateTime)
            {
                return ((DateTime)value).ToString("yyyy-MM-dd HH:mm:ss");
            }
            else
            {
                return value;
            }
        }

        private void FillHeaders()
        {
            var col = 1;
            foreach (var title in _titles)
            {
                _sheet.Cells[1, col].Value = title;
                col += 1;
            }
        }

        private List<string> ExtractHeaders()
        {
            return _properties.Select(x => x.GetDisplayName()).ToList();
        }

        #region IDisposable Support
        private bool disposedValue = false; // 要检测冗余调用

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                }

                _excel.Dispose();

                disposedValue = true;
            }
        }

        ~ExcelExportManager()
        {
            Dispose(false);
        }
        
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}
