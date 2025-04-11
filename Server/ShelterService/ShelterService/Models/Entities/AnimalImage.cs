using System.ComponentModel.DataAnnotations;

namespace ShelterService.Models.Entities
{
    public class AnimalImage
    {
        public int Id { get; set; }
        public int AnimalId { get; set; }
        public string ImagePath { get; set; }
    }
}
