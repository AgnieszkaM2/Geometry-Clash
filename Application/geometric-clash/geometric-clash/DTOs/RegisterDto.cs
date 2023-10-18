using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace geometric_clash.DTOs
{
    public class RegisterDto
    {
        [Required]
        [MinLength(4)]
        [MaxLength(20)]
        public string Username { get; set; }
        [Required]
        [MinLength(4)]
        [MaxLength(20)]
        public string Password { get; set; }
        [Required]
        [MaxLength(50)]
        public string Email { get; set; }
    }
}
