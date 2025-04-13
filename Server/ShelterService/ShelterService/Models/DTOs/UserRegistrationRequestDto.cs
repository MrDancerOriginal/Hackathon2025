using System.ComponentModel.DataAnnotations;

namespace ShelterService.Models.DTOs
{
    public class UserRegistrationRequestDto
    {
        // Спільні поля
        [Required]
        public string Role { get; set; } // "Shelter" або "Volunteer"

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public string Phone { get; set; }

        // Додаткові поля для притулку
        public string? ShelterName { get; set; }
        public string? Address { get; set; }
        public string? Category { get; set; }

        // Додаткові поля для волонтера
        public string? FullName { get; set; }
    }
}
