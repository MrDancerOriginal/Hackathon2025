namespace ShelterService.Models.DTOs;

public class LikedAnimalDto
{
    public int AnimalId { get; set; }
    public string AnimalName { get; set; }
    public string AnimalSpecies { get; set; }
    public string? AnimalAge { get; set; }
    public string VolunteerUserId { get; set; }
    public DateTime LikedDate { get; set; }
}
