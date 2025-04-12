namespace ShelterService.Models.Entities
{
    public class Shelter
    {
        public string UserId { get; set; }
        public int ShelterId { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public ShelterCategory Category { get; set; }
        /// <summary>
        /// Розміщені оголошення з тваринками.
        /// </summary>
        public virtual ICollection<Animal> Announcements { get; set; } = new List<Animal>();

        /// <summary>
        /// Запити від волонтерів надіслані до притулку щоб віддати або забрати тваринку.
        /// </summary>
        //public virtual ICollection<Request> Requests { get; set; } = new List<Request>();
    }
}
