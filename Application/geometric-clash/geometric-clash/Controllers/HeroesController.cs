using System.Collections.Generic;
using System.Threading.Tasks;
using geometric_clash.Data;
using geometric_clash.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace geometric_clash.Controllers
{
    public class HeroesController: BaseApiController
    {
        private readonly DataContext _context;

        public HeroesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hero>>> GetHeroes()
        {
            return  await _context.heroes.ToListAsync();
        }
    }
}