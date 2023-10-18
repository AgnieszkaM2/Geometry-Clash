using geometric_clash.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace geometric_clash.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
