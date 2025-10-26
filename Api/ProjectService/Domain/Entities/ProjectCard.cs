using Core.Cards;

namespace Domain.Entities
{
    public record ProjectCard : CardEntity
    {
        public required string LandingURL { get; set; }
        public required string DocumentationPath { get; set; }
    }
}