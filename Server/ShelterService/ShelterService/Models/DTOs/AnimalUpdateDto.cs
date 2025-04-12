namespace ShelterService.Models.DTOs
{
    public class AnimalUpdateDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Species { get; set; }
        public string? Age { get; set; }
        public string? Health { get; set; }

        public List<IFormFile>? Photos { get; set; }
    }
}
