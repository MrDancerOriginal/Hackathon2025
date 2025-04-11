namespace ShelterService.Models.Entities
{
    public class Animal
    {
        public int Id { get; set; }
        public int ShelterId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Species { get; set; }
        public string? Age { get; set; }
        public string? Health { get; set; }
        public string? PhotoUrl { get; set; }
    }
}
