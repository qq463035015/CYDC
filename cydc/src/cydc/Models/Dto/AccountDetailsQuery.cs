using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cydc.Models
{
    public enum AmountInterval
    {
        Lt0 = -1,
        Eq0 = 0,
        Gt0 = 1,
        nullValue = 2
    }
    public class AccountDetailsQuery : BasePagedDbQuery
    {

        public string UserName { get; set; }

        public AmountInterval Interval = AmountInterval.nullValue;
    }
}
