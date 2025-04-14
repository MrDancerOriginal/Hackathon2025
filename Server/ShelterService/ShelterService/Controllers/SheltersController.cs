using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShelterService.Data;
using ShelterService.Models.DTOs;
using ShelterService.Models.Entities;

namespace ShelterService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SheltersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SheltersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/shelters 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shelter>>> GetAllShelters()
        {
            var shelters = await _context.Shelters
                .Include(s => s.Announcements)
                .ToListAsync();
            return Ok(shelters);
        }

        // GET: api/shelters/{id} 
        [HttpGet("{id}")]
        public async Task<ActionResult<Shelter>> GetShelterById(int id)
        {
            var shelter = await _context.Shelters
                .Include(s => s.Announcements) 
                .FirstOrDefaultAsync(s => s.ShelterId == id);

            if (shelter == null)
                return NotFound();

            return Ok(shelter);
        }

        // GET: api/shelters/byUserId/<userIdString>
        [HttpGet("byUserId/{userId}")]
        public async Task<ActionResult<Shelter>> GetShelterByUserId(string userId)
        {
            var shelter = await _context.Shelters
                .Include(s => s.Announcements)
                .FirstOrDefaultAsync(s => s.UserId == userId);

            if (shelter == null)
                return NotFound(new { message = "Shelter not found by userId" });

            return Ok(shelter);
        }

        // POST: api/shelters
        [HttpPost]
        public async Task<ActionResult<Shelter>> AddShelter(Shelter shelter)
        {
            _context.Shelters.Add(shelter);
            await _context.SaveChangesAsync();

            return Ok(); 
        }

        [HttpGet("{shelterId}/liked-animals")]
        public async Task<ActionResult<IEnumerable<LikedAnimalDto>>> GetLikedAnimalsForShelter(int shelterId)
        {
            // 1. Перевіряємо чи існує притулок
            var shelter = await _context.Shelters
                .Include(s => s.Announcements)
                .FirstOrDefaultAsync(s => s.ShelterId == shelterId);

            if (shelter == null)
                return NotFound(new { message = "Shelter not found" });

            // 2. Отримуємо всі лайки для тварин цього притулку
            var animalIds = shelter.Announcements.Select(a => a.Id).ToList();

            var likedAnimals = await _context.Favorites
                .Where(f => animalIds.Contains(f.AnnouncementId))
                .Include(f => f.Announcement)
                .Select(f => new LikedAnimalDto
                {
                    AnimalId = f.Announcement.Id,
                    AnimalName = f.Announcement.Name,
                    AnimalSpecies = f.Announcement.Species,
                    AnimalAge = f.Announcement.Age,
                    VolunteerUserId = f.UserId,
                    LikedDate = f.AddedDate
                })
                .ToListAsync();

            return Ok(likedAnimals);
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateShelter(string userId, [FromForm] ShelterUpdateDto dto)
        {
            var shelter = await _context.Shelters.FirstOrDefaultAsync(s => s.UserId == userId);
            if (shelter == null)
                return NotFound();

            shelter.Name = dto.Name;
            shelter.Address = dto.Address;
            shelter.Phone = dto.Phone;
            shelter.Category = dto.Category;

            if (dto.Photo != null)
            {
                var uploadsFolder = Path.Combine("wwwroot", "images", "shelters");
                Directory.CreateDirectory(uploadsFolder); // якщо ще не існує
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.Photo.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Photo.CopyToAsync(stream);
                }

                shelter.Photo = $"/images/shelters/{fileName}";
            }

            await _context.SaveChangesAsync();

            return Ok(shelter);
        }
    }
}
