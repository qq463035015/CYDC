using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace cydc.Models
{
    public class HttpStatusCodeException : Exception
    {
        public HttpStatusCode HttpStatusCode { get; set; }

        public override string Message => _message;

        public HttpStatusCodeException()
        {
        }

        public HttpStatusCodeException(HttpStatusCode httpStatusCode)
        {
            HttpStatusCode = httpStatusCode;
        }

        public HttpStatusCodeException(HttpStatusCode httpStatusCode, string message)
        {
            HttpStatusCode = httpStatusCode;
            _message = message;
        }

        private string _message;
    }
}
