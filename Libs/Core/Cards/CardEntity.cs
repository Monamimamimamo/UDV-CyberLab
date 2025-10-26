using ExampleCore.Dal.Base;

namespace Core.Cards
{
    public record CardEntity : BaseEntity<Guid>
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public string? ShortDescription { get; set; }
        public required string OwnerName { get; set; }
        public required Guid OwnerId { get; set; }
        public required double Rating { get; set; }
        public required string LogoPath { get; set; }
        public string? PhotoPath { get; set; }
        public int ViewsCount { get; set; }
        public int CommentsCount { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
