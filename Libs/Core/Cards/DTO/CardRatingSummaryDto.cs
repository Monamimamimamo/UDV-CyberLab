namespace Domain.DTO
{
    public class CardRatingSummaryDto
    {
        public required Guid CardId { get; set; }
        public required double AverageRating { get; set; }
        public required int TotalRatings { get; set; }
        public double? UserRating { get; set; }
    }
}