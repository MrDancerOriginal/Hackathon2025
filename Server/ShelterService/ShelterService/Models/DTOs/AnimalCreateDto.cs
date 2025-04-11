namespace ShelterService.Models.DTOs
{
    public class AnimalCreateDto
    {
        public int ShelterId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Species { get; set; }
        public string Age { get; set; }
        public string Health { get; set; }
        public List<IFormFile> Photos { get; set; }
    }
}
