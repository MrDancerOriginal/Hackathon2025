using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShelterService.Data;
using ShelterService.Models.Entities;

namespace ShelterService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AnimalsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/animals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Animal>>> GetAllAnimals()
        {
            var animals = await _context.Animals.ToListAsync();
            return Ok(animals);
        }

        // GET: api/animals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Animal>> GetAnimalById(int id)
        {
            var animal = await _context.Animals
                .FirstOrDefaultAsync(a => a.Id == id);

            if (animal == null)
                return NotFound();

            return Ok(animal);
        }

        // POST: api/animals
        [HttpPost]
        public async Task<ActionResult<Animal>> AddAnimal(Animal animal)
        {
            var shelter = await _context.Shelters.FindAsync(animal.ShelterId);
            if (shelter == null)
            {
                return BadRequest("Shelter not found.");
            }

            _context.Animals.Add(animal);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}

