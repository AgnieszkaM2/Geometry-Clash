using System;
using System.Linq;
using System.Threading.Tasks;
using geometric_clash.Data;
using geometric_clash.DTOs;
using geometric_clash.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace geometric_clash.Controllers
{
    public class FriendsController : BaseApiController
    {
        private readonly DataContext _context;

        public FriendsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IQueryable<Object> GetFriends(int id)
        {
            var query = from f in _context.friends
                        join u in _context.users on f.User equals u.Id
                        join uf in _context.users on f.User_Friend equals uf.Id
                        where u.Id == id
                        select new
                        {
                            friendName = uf.UserName
                        };
            return query;
        }


        [HttpPost]
        public async Task<ActionResult<Friends>> AddFriend(FriendsDTO friendsDTO)
        {
            if (friendsDTO.UserId == friendsDTO.FriendId) return BadRequest("Nie mozesz byc wlasnym przyjacielem");
            var friend = (from f in _context.friends
                        where f.User == friendsDTO.UserId
                        && f.User_Friend == friendsDTO.FriendId
                        select f).Any();
                        
            if (friend) return BadRequest("Juz jest twoim przyjacielem");
            var friends = new Friends
            {
                User = friendsDTO.UserId,
                User_Friend = friendsDTO.FriendId
            };

            _context.Add(friends);
            await _context.SaveChangesAsync();
            return Ok("Nowy przyjaciel dodany do listy!");
        }
    }
}