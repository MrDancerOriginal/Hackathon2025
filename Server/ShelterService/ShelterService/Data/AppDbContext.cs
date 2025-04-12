using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ShelterService.Models.Entities;

namespace ShelterService.Data
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
          : base(options)
        {
        }
        public DbSet<Animal> Animals { get; set; }
        public DbSet<Shelter> Shelters { get; set; }
        public DbSet<AnimalImage> AnimalImages { get; set; }

        public DbSet<Volunteer> Volunteers { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Request> Requests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
