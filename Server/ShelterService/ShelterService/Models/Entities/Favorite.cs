namespace ShelterService.Models.Entities
{
    /// <summary>
    /// Збережені оголошення («вибране», «улюблене») для користувачів.
    /// </summary>
    public class Favorite
    {
        public int FavoriteId { get; set; }
        public string UserId { get; set; }

        public int AnnouncementId { get; set; }

        public virtual Animal Announcement { get; set; }

        public DateTime AddedDate { get; set; } = DateTime.UtcNow;
    }
}
