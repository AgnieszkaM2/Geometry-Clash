using System;
using System.Linq;
using System.Threading.Tasks;
using geometric_clash.Data;
using geometric_clash.DTOs;
using geometric_clash.Entities;
using Microsoft.AspNetCore.Mvc;

namespace geometric_clash.Controllers
{
    public class GlobalChatController : BaseApiController
    {
        private readonly DataContext _context;
        public GlobalChatController(DataContext context)
        {
            _context = context;

        }

        [HttpGet]
        public IQueryable<Object> GetChatMessages()
        {
            var query = from g in _context.global_chat
                        join u in _context.users on g.User equals u.Id
                        orderby g.Id descending
                        select new
                        {
                            id = g.Id,
                            user = u.UserName,
                            message = g.Message
                        };
            return query;
        }

        [HttpPost]
        public async Task<ActionResult<Global_chat>> SendChatMessage(GlobalChatDTO globalChatDTO)
        {
            
            
            var chatMessage = new Global_chat
            {
                User = globalChatDTO.UserId,
                Message = globalChatDTO.Message
            };

            _context.global_chat.Add(chatMessage);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}