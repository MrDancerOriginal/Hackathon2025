namespace ShelterService.Models.DTOs
{
    public class AnimalListDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Species { get; set; }
        public string? Age { get; set; }
        public string? MainImagePath { get; set; }
    }
}
