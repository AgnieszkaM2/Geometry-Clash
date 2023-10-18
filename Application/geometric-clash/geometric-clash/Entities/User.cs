using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace geometric_clash.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] Password { get; set; }
        public byte[] Password_Salt { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Email { get; set; }
    }
}
