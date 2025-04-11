using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShelterService.Data;
using ShelterService.Models.DTOs;
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
        public async Task<ActionResult<Animal>> AddAnimal([FromForm] AnimalCreateDto model)
        {
            var shelter = await _context.Shelters.FindAsync(model.ShelterId);
            if (shelter == null)
            {
                return BadRequest("Shelter not found.");
            }

            var animal = new Animal
            {
                ShelterId = model.ShelterId,
                Name = model.Name,
                Description = model.Description,
                Species = model.Species,
                Age = model.Age,
                Health = model.Health
            };

            _context.Animals.Add(animal);
            await _context.SaveChangesAsync();

            if (model.Photos != null && model.Photos.Count > 0)
            {
                foreach (var formFile in model.Photos)
                {
                    if (formFile.Length > 0)
                    {
                        // a) Генеруємо нове ім’я файлу (щоб уникнути колізій)
                        var uniqueFileName = $"{Guid.NewGuid()}_{formFile.FileName}";

                        // b) Шлях до папки
                        var folderPath = Path.Combine("wwwroot", "uploads");
                        if (!Directory.Exists(folderPath))
                        {
                            Directory.CreateDirectory(folderPath);
                        }

                        var filePath = Path.Combine(folderPath, uniqueFileName);

                        // c) Копіюємо файл в папку
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await formFile.CopyToAsync(stream);
                        }

                        // d) Додаємо запис у таблицю AnimalImages
                        var animalImage = new AnimalImage
                        {
                            AnimalId = animal.Id,
                            // зберігаємо відносний шлях
                            ImagePath = Path.Combine("uploads", uniqueFileName)
                        };
                        _context.AnimalImages.Add(animalImage);
                    }
                }
                await _context.SaveChangesAsync(); // зберігаємо створені записи AnimalImages
            }

            return Ok();
        }
    }
}

