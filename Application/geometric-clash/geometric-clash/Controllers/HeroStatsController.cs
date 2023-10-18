using System.Collections.Generic;
using System.Threading.Tasks;
using geometric_clash.Data;
using geometric_clash.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace geometric_clash.Controllers
{
    public class HeroStatsController: BaseApiController
    {
        private readonly DataContext _context;

        public HeroStatsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Heroes_stats>>> GetHeroStats()
        {
            return  await _context.heroes_stats.ToListAsync();
        }

        
    }
}