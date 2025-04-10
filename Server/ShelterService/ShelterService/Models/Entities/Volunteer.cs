namespace ShelterService.Models.Entities
{
    public class Volunteer
    {
        public string UserId { get; set; }

        /// <summary>
        /// Можливі інтереси або напрямки допомоги (напр. робота з собаками, котами, пошук фінансів тощо).
        /// </summary>
        public string? Interests { get; set; }

        /// <summary>
        /// Регіон або місто, де волонтер може допомагати.
        /// </summary>
        public string? Location { get; set; }

        /// <summary>
        /// Список запитів, які волонтер відправив до притулків.
        /// </summary>
        public virtual ICollection<Request> Requests { get; set; } = new List<Request>();

        /// <summary>
        /// Улюблені оголошення (збережені).
        /// </summary>
        public virtual ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
    }
}
