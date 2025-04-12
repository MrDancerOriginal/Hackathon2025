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
        public async Task<ActionResult<IEnumerable<AnimalListDto>>> GetAllAnimals()
        {
            var animals = await _context.Animals
                .Select(a => new AnimalListDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    Species = a.Species,
                    Age = a.Age,
                    MainImagePath = _context.AnimalImages
                        .Where(img => img.AnimalId == a.Id)
                        .Select(img => img.ImagePath)
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(animals);
        }

        // GET: api/animals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Animal>> GetAnimalById(int id)
        {
            var animal = await _context.Animals
                .Include(a => a.Images)
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAnimal(int id, [FromForm] AnimalUpdateDto model)
        {
            var animal = await _context.Animals.FindAsync(id);
            if (animal == null)
                return NotFound("Animal not found.");

            // Оновлюємо текстові поля
            if (!string.IsNullOrEmpty(model.Name))
                animal.Name = model.Name;

            if (!string.IsNullOrEmpty(model.Description))
                animal.Description = model.Description;

            if (!string.IsNullOrEmpty(model.Species))
                animal.Species = model.Species;

            if (!string.IsNullOrEmpty(model.Age))
                animal.Age = model.Age;

            if (!string.IsNullOrEmpty(model.Health))
                animal.Health = model.Health;

            // Якщо є нові фото
            if (model.Photos != null && model.Photos.Count > 0)
            {
                // 1. Видаляємо попередні фото (опційно)
                var existingPhotos = await _context.AnimalImages
                    .Where(img => img.AnimalId == animal.Id)
                    .ToListAsync();

                foreach (var photo in existingPhotos)
                {
                    var fullPath = Path.Combine("wwwroot", photo.ImagePath);
                    if (System.IO.File.Exists(fullPath))
                        System.IO.File.Delete(fullPath);

                    _context.AnimalImages.Remove(photo);
                }

                // 2. Додаємо нові фото
                foreach (var formFile in model.Photos)
                {
                    if (formFile.Length > 0)
                    {
                        var uniqueFileName = $"{Guid.NewGuid()}_{formFile.FileName}";
                        var folderPath = Path.Combine("wwwroot", "uploads");
                        if (!Directory.Exists(folderPath))
                            Directory.CreateDirectory(folderPath);

                        var filePath = Path.Combine(folderPath, uniqueFileName);

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await formFile.CopyToAsync(stream);
                        }

                        var animalImage = new AnimalImage
                        {
                            AnimalId = animal.Id,
                            ImagePath = Path.Combine("uploads", uniqueFileName)
                        };
                        _context.AnimalImages.Add(animalImage);
                    }
                }
            }

            _context.Animals.Update(animal);
            await _context.SaveChangesAsync();

            return Ok("Оголошення оновлено");
        }

        // DELETE: api/animals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnimal(int id)
        {
            var animal = await _context.Animals
                .Include(a => a.Images) // щоб отримати зображення
                .FirstOrDefaultAsync(a => a.Id == id);

            if (animal == null)
                return NotFound("Animal not found.");

            // Видалити файли з диску
            foreach (var image in animal.Images)
            {
                var fullPath = Path.Combine("wwwroot", image.ImagePath);
                if (System.IO.File.Exists(fullPath))
                {
                    System.IO.File.Delete(fullPath);
                }
            }

            // Видалити записи із таблиці AnimalImages
            _context.AnimalImages.RemoveRange(animal.Images);

            // Видалити саму тваринку
            _context.Animals.Remove(animal);

            await _context.SaveChangesAsync();

            return Ok("Тваринку успішно видалено.");
        }
    }
}

