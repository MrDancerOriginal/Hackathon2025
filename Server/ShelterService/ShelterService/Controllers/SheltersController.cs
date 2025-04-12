using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShelterService.Data;
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
    }
}
