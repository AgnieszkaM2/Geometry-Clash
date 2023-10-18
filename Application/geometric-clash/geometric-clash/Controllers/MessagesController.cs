using System.Collections.Generic;
using System.Threading.Tasks;
using geometric_clash.Data;
using geometric_clash.DTOs;
using geometric_clash.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;

namespace geometric_clash.Controllers
{
    public class MessagesController : BaseApiController
    {
        private readonly DataContext _context;
        public MessagesController(DataContext context)
        {
            _context = context;

        }

        [HttpGet("Received")]
        public IQueryable<Object> GetMessages(int id)
        {
            
            var result =  from m in _context.messages
                        join u in _context.users on m.User equals u.Id
                        join s in _context.users on m.Sender equals s.Id
                        where m.User == id
                        select new
                        {
                            user = u.UserName,
                            sender = s.UserName,
                            message = m.Message
                        };
            return result;
        }

        [HttpGet("Sent")]
        public IQueryable<Object> GetSentMessages(int id)
        {
            
            var result =  from m in _context.messages
                        join u in _context.users on m.User equals u.Id
                        join s in _context.users on m.Sender equals s.Id
                        where m.Sender == id
                        select new
                        {
                            user = u.UserName,
                            sender = s.UserName,
                            message = m.Message
                        };
            return result;
        }

        [HttpGet("Unread")]
        public int GetUnreadMessagesCount(int id)
        {
            
            var count = _context.messages.Count(messages => messages.User == id && messages.IsRead == 0);
            return count;
        }
        
        [HttpPost]
        public async Task<ActionResult<Messages>> SendMessage(MessageDTO messageDTO)
        {
            var user = await _context.users.SingleOrDefaultAsync(x => x.UserName == messageDTO.Receiver);
            if (user == null) return BadRequest("Nie ma takiego użytkownika");
            var message = new Messages
            {
                User = user.Id,
                Sender = messageDTO.Sender,
                Message = messageDTO.Text,
                IsRead = 0
            };

            _context.messages.Add(message);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpPut]
        public async Task<ActionResult<Messages>> ChangeReadMessageStatus(int id)
        {
            var unreadMessages = _context.messages.Where(messages => messages.User == id && messages.IsRead == 0).ToList();
            foreach (var message in unreadMessages)
            {
                message.IsRead = 1;
                _context.messages.Update(message);
            }

            await _context.SaveChangesAsync();
            return NoContent();

        }


        [HttpGet("{id}")]
        public IQueryable<Object> GetMessage(int id)
        {
            
            var result =  from m in _context.messages
                        join u in _context.users on m.User equals u.Id
                        join s in _context.users on m.Sender equals s.Id
                        where m.Id == id
                        select new
                        {
                            user = u.UserName,
                            sender = s.UserName,
                            message = m.Message
                        };
            
            return result;
        }
    }
}