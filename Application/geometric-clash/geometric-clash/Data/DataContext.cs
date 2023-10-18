using geometric_clash.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace geometric_clash.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> users { get; set; }
        public DbSet<Hero> heroes { get; set; }
        public DbSet<Heroes_stats> heroes_stats { get; set; }

        public DbSet<Messages> messages {get; set;}
        public DbSet<Global_chat> global_chat { get; set; }

        public DbSet<Friends> friends {get; set;}

    }
}
