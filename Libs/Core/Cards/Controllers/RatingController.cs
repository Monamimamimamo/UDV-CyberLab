using Core.Cards.DTO;
using Core.Cards.Service.Interface;
using ExampleCore.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace Core.Cards.Controllers;

public abstract class RatingController(IRatingService _ratingService) : ControllerBase
{
    [HttpGet("card/{cardId}")]
    public async Task<IActionResult> GetProjectRatingSummary(Guid cardId)
    {
        var userId = UserHelper.GetUserId(HttpContext.Request);
        var summary = await _ratingService.GetProjectRatingSummaryAsync(cardId, userId);
        return Ok(summary);
    }

    [HttpGet("card/{cardId}/ratings")]
    public async Task<IActionResult> GetProjectRatings(Guid cardId)
    {
        var ratings = await _ratingService.GetAllRatingsForProjectAsync(cardId);
        return Ok(ratings);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrUpdateRating([FromBody] RatingCreateDto ratingDto)
    {
        var userId = UserHelper.GetUserId(HttpContext.Request);
        var rating = await _ratingService.CreateOrUpdateRatingAsync(ratingDto, userId);
        return Ok(rating);
    }

    [HttpDelete("card/{cardId}")]
    public async Task<IActionResult> DeleteRating(Guid cardId)
    {
        var userId = UserHelper.GetUserId(HttpContext.Request);
        var result = await _ratingService.DeleteRatingAsync(cardId, userId);
        return Ok(result);
    }
}