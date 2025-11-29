using Core.Cards;

namespace Domain.Entities
{
    public record LearnMaterialCard : CardEntity
    {
        public string? URL { get; set; }
        public required string PublicationType { get; set; }
    }
}