using Microsoft.EntityFrameworkCore;
using ShelterService.Models.Entities;

namespace ShelterService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
          : base(options)
        {
        }
        public DbSet<Animal> Animals { get; set; }
        public DbSet<Shelter> Shelters { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
