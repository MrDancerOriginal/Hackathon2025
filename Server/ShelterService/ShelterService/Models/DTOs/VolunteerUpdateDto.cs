namespace ShelterService.Models.DTOs
{
    public class VolunteerUpdateDto
    {
        public string? Name { get; set; }
        public string? Phone { get; set; }
        public string? Interests { get; set; }
        public string? Location { get; set; }
        public IFormFile? Photo { get; set; }
    }
}
