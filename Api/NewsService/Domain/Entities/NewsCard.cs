using Core.Cards;

namespace Domain.Entities
{
    public record NewsCard : CardEntity
    {
        public string? URL { get; set; }
    }
}
