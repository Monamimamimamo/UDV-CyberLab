using AutoMapper;
using Core.Cards.DTO;
using Core.Cards.Repository.Interface;
using Core.Cards.Service.Interface;
using CRM.Data.Common.Exceptions;
using Domain.DTO;

namespace Core.Cards.Service;

public class RatingService(
    IRatingRepository _ratingRepository,
    ICardRepository _cardRepository,
    IMapper _mapper)
    : IRatingService
{
    public async Task<RatingDto> CreateOrUpdateRatingAsync(RatingCreateDto ratingDto, Guid userId)
    {
        var project = await _cardRepository.GetByIdAsync<CardEntity>(ratingDto.ProjectId);
        if (project == null)
        {
            throw new NotFoundException($"Project with id {ratingDto.ProjectId} not found.");
        }

        if (ratingDto.Value is < 1 or > 5)
        {
            throw new BadRequestException("Rating value must be between 1 and 5.");
        }

        var existingRating = await _ratingRepository.GetUserRatingForProjectAsync(ratingDto.ProjectId, userId);

        if (existingRating != null)
        {
            existingRating.Value = ratingDto.Value;
            existingRating.UpdatedAt = DateTime.UtcNow;

            await _ratingRepository.UpdateAsync(existingRating);

            await UpdateProjectRatingAsync(ratingDto.ProjectId);

            return _mapper.Map<RatingDto>(existingRating);
        }

        var newRating = new Rating
        {
            Id = Guid.NewGuid(),
            CardId = ratingDto.ProjectId,
            UserId = userId,
            Value = ratingDto.Value,
            CreatedAt = DateTime.UtcNow
        };

        await _ratingRepository.CreateAsync(newRating.Id, newRating);

        await UpdateProjectRatingAsync(ratingDto.ProjectId);

        return _mapper.Map<RatingDto>(newRating);
    }

    public async Task<CardRatingSummaryDto> GetProjectRatingSummaryAsync(Guid cardId, Guid userId)
    {
        var project = await _cardRepository.GetByIdAsync<CardEntity>(cardId);
        if (project == null)
        {
            throw new NotFoundException($"Project with id {cardId} not found.");
        }

        var averageRating = await _ratingRepository.GetAverageRatingForProjectAsync(cardId);
        var totalRatings = await _ratingRepository.GetRatingCountForProjectAsync(cardId);

        var userRating = await _ratingRepository.GetUserRatingForProjectAsync(cardId, userId);

        return new CardRatingSummaryDto
        {
            CardId = cardId,
            AverageRating = averageRating,
            TotalRatings = totalRatings,
            UserRating = userRating?.Value
        };
    }

    public async Task<List<RatingDto>> GetAllRatingsForProjectAsync(Guid projectId)
    {
        var project = await _cardRepository.GetByIdAsync<CardEntity>(projectId);
        if (project == null)
        {
            throw new NotFoundException($"Project with id {projectId} not found.");
        }

        var ratings = await _ratingRepository.GetAllRatingsForProjectAsync(projectId);
        return _mapper.Map<List<RatingDto>>(ratings);
    }

    public async Task<bool> DeleteRatingAsync(Guid projectId, Guid userId)
    {
        var rating = await _ratingRepository.GetUserRatingForProjectAsync(projectId, userId);
        if (rating == null)
        {
            throw new NotFoundException($"Rating for project {projectId} by user {userId} not found.");
        }

        await _ratingRepository.DeleteAsync(rating);

        await UpdateProjectRatingAsync(projectId);

        return true;
    }

    private async Task UpdateProjectRatingAsync(Guid projectId)
    {
        var project = await _cardRepository.GetByIdAsync<CardEntity>(projectId);
        if (project == null)
        {
            throw new NotFoundException($"Project with id {projectId} not found.");
        }

        var averageRating = await _ratingRepository.GetAverageRatingForProjectAsync(projectId);

        project.Rating = averageRating;

        await _cardRepository.UpdateAsync(project);
    }
}