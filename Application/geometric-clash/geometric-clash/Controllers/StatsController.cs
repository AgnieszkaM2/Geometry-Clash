using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using geometric_clash.Data;
using geometric_clash.DTOs;
using geometric_clash.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace geometric_clash.Controllers
{
    public class StatsController : BaseApiController
    {
        private readonly DataContext _context;
        public StatsController(DataContext context)
        {
            _context = context;

        }

        [HttpGet()]
        public IQueryable<Object> GetStats()
        {
            var query = from s in _context.heroes_stats
                   join h in _context.heroes on s.Hero equals h.Id
                   join u in _context.users on s.User equals u.Id
                   orderby s.Points
                   select new
                   {
                       username = u.UserName,
                       heroname = h.Hero_name,
                       points = s.Points
                   };
            query = query.Reverse();

             return query;
        }

        [HttpPost]
        public async Task<ActionResult<Heroes_stats>> AddScore(HeroesStatsDTO heroesStatsDTO)
        {
            var score = new Heroes_stats
            {
                Hero = heroesStatsDTO.HeroId,
                User = heroesStatsDTO.UserId,
                Points = heroesStatsDTO.Points
            };
            _context.Add(score);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}