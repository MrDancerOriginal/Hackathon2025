using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShelterService.Data;
using ShelterService.Models.DTOs;
using ShelterService.Models.Entities;

namespace ShelterService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VolunteersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VolunteersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/volunteers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Volunteer>>> GetAllVolunteers()
        {
            var volunteers = await _context.Volunteers.ToListAsync();
            return Ok(volunteers);
        }

        // GET: api/volunteers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Volunteer>> GetVolunteer(int id)
        {
            var volunteer = await _context.Volunteers.FindAsync(id);
            if (volunteer == null)
            {
                return NotFound(new { message = "Volunteer not found" });
            }
            return Ok(volunteer);
        }

        [HttpGet("byUserId/{userId}")]
        public async Task<ActionResult<Volunteer>> GetVolunteerByUserId(string userId)
        {
            var volunteer = await _context.Volunteers
                                          .FirstOrDefaultAsync(v => v.UserId == userId);

            if (volunteer == null)
            {
                return NotFound(new { message = "Volunteer not found" });
            }
            return Ok(volunteer);
        }

        // POST: api/volunteers/{volunteerId}/likes
        [HttpPost("{volunteerId}/likes")]
        public async Task<ActionResult> LikeAnimal(int volunteerId, [FromBody] int animalId)
        {
            var volunteer = await _context.Volunteers.FindAsync(volunteerId);
            if (volunteer == null)
                return NotFound(new { message = "Volunteer not found" });

            var animal = await _context.Animals.FindAsync(animalId);
            if (animal == null)
                return BadRequest(new { message = "Invalid animalId" });

            var favorite = new Favorite
            {
                UserId = volunteer.UserId,
                AnnouncementId = animal.Id,
                AddedDate = DateTime.UtcNow
            };
            _context.Favorites.Add(favorite);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Animal liked" });
        }

        // GET: api/volunteers/{volunteerId}/likes
        [HttpGet("{volunteerId}/likes")]
        public async Task<ActionResult> GetLikedAnimals(int volunteerId)
        {
            var volunteer = await _context.Volunteers.FindAsync(volunteerId);
            if (volunteer == null)
                return NotFound(new { message = "Volunteer not found" });

            var favorites = await _context.Favorites
                                          .Include(f => f.Announcement)
                                          .Where(f => f.UserId == volunteer.UserId)
                                          .ToListAsync();

            return Ok(favorites);
        }

        // DELETE: api/volunteers/{volunteerId}/likes/{favoriteId}
        [HttpDelete("{volunteerId}/likes/{favoriteId}")]
        public async Task<IActionResult> DeleteLike(int volunteerId, int favoriteId)
        {
            var volunteer = await _context.Volunteers.FindAsync(volunteerId);
            if (volunteer == null)
                return NotFound(new { message = "Volunteer not found" });

            var favorite = await _context.Favorites.FindAsync(favoriteId);
            if (favorite == null)
                return NotFound(new { message = "Like not found" });

            if (favorite.UserId != volunteer.UserId)
                return Forbid();

            _context.Favorites.Remove(favorite);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("byUserId/{userId}")]
        public async Task<IActionResult> UpdateVolunteerByUserId(string userId, [FromForm] VolunteerUpdateDto dto)
        {
            var volunteer = await _context.Volunteers.FirstOrDefaultAsync(v => v.UserId == userId);
            if (volunteer == null)
                return NotFound(new { message = "Volunteer not found" });

            if (dto.Name != null)
                volunteer.Name = dto.Name;
            volunteer.Phone = dto.Phone;
            volunteer.Interests = dto.Interests;
            volunteer.Location = dto.Location;

            if (dto.Photo != null)
            {
                var uploadsFolder = Path.Combine("wwwroot", "images", "volunteers");
                Directory.CreateDirectory(uploadsFolder);

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.Photo.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Photo.CopyToAsync(stream);
                }

                volunteer.Photo = $"/images/volunteers/{fileName}";
            }

            await _context.SaveChangesAsync();

            return Ok(volunteer);
        }
    }
}
