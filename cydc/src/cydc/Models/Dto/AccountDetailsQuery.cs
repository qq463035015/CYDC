using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public enum AmountInterval
    {
        Lt0,
        Eq0,
        Gt0 
    }

    public class AccountDetailsQuery : BasePagedDbQuery
    {

        public string UserName { get; set; }

        public AmountInterval? Interval { get; set; }
    }
}
