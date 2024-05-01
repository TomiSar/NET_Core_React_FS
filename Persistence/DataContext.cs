using Domain;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DbSet<Activity> Activities { get; set; }

        public DataContext(DbContextOptions options) : base(options)
        {
            
        }
    }
}
