using ExampleCore.Dal.Base;

namespace Core.Cards
{
    public record Comment : BaseEntity<Guid>
    {
        public required string Text { get; set; }
        public required Guid AuthorId { get; set; }
        public required string AuthorName { get; set; }
        public required Guid CardId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public CardEntity? Card { get; set; }
    }
}
