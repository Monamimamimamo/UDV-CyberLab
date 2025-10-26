using Core.Cards.DTO;
using Domain.DTO;

namespace Core.Cards.Service.Interface;

public interface IRatingService
{
    Task<RatingDto> CreateOrUpdateRatingAsync(RatingCreateDto ratingDto, Guid userId);
    Task<CardRatingSummaryDto> GetProjectRatingSummaryAsync(Guid projectId, Guid userId);
    Task<List<RatingDto>> GetAllRatingsForProjectAsync(Guid projectId);
    Task<bool> DeleteRatingAsync(Guid projectId, Guid userId);
}