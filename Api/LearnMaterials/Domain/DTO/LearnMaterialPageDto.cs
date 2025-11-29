namespace Domain.DTO
{
    public class LearnMaterialPageDto: ShortCardDto
    {
        public required string Description { get; set; }
        public string? PhotoPath { get; set; }
        public string URL { get; set; }
    }
}