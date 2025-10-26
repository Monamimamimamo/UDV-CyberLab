namespace Domain.DTO
{
    public class NewsPageDto: ShortCardDto
    {
        public required string Description { get; set; }
        public string? PhotoPath { get; set; }
        public string URL { get; set; }
    }
}