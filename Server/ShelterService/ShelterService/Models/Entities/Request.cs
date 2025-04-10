namespace ShelterService.Models.Entities
{
    public class Request
    {
        public int RequestId { get; set; }

        /// <summary>
        /// Ідентифікатор користувача, який створює запит.
        /// </summary>
        public string UserId { get; set; }

        /// <summary>
        /// Ідентифікатор притулку, куди адресовано запит.
        /// </summary>
        public int ShelterId { get; set; }

        public virtual Shelter? Shelter { get; set; }

        /// <summary>
        /// Ідентифікатор конкретного оголошення (optional).
        /// </summary>
        public int? AnnouncementId { get; set; }

        public virtual Animal? Announcement { get; set; }

        public string? RequestText { get; set; }

        public string RequestStatus { get; set; } = "Pending";

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}
