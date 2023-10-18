using AutoMapper;
using geometric_clash.Data;
using geometric_clash.DTOs;
using geometric_clash.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace geometric_clash.Controllers
{

    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UsersController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _context.users.ToListAsync();

            var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);

            return  Ok(usersToReturn);
        }

        [HttpPut]
        public async Task<ActionResult<User>> UpdateUser(MemberDto member)
        {
            var username = member.UserName;
            var result = (from u in _context.users where u.UserName == username
                        select u).SingleOrDefault();

            result.Firstname = member.Firstname;
            result.Lastname = member.Lastname;
            result.Country = member.Country;
            result.City= member.City;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUserByUsername(string username)
        {
            var user = await _context.users.SingleOrDefaultAsync(x => x.UserName == username);
            return _mapper.Map<MemberDto>(user);
        }
        
    }
}
