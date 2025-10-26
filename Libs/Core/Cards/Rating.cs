using ExampleCore.Dal.Base;

namespace Core.Cards
{
    public record Rating : BaseEntity<Guid>
    {
        public required Guid CardId { get; set; }
        public required Guid UserId { get; set; }
        public required double Value { get; set; } // Rating value (e.g., 1-5)
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        public CardEntity? Card { get; set; }
    }
}
