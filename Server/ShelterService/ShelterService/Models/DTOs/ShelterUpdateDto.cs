namespace ShelterService.Models.DTOs
{
    public class ShelterUpdateDto
    {
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? Category { get; set; }
        public IFormFile? Photo { get; set; }
    }
}
