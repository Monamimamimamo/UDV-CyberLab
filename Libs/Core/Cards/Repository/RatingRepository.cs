using Core.Cards.Repository.Interface;
using Infrastucture.Data;
using Microsoft.EntityFrameworkCore;

namespace Core.Cards.Repository;

public class RatingRepository(DbContext context) : BaseRepository(context), IRatingRepository
{
    private DbSet<Rating> _ratings = context.Set<Rating>();

    public async Task<Rating?> GetUserRatingForProjectAsync(Guid projectId, Guid userId)
    {
        return await _ratings
            .FirstOrDefaultAsync(r => r.CardId == projectId && r.UserId == userId);
    }

    public async Task<List<Rating>> GetAllRatingsForProjectAsync(Guid projectId)
    {
        return await _ratings
            .Where(r => r.CardId == projectId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
    }

    public async Task<double> GetAverageRatingForProjectAsync(Guid projectId)
    {
        var avg = await _ratings
            .Where(r => r.CardId == projectId)
            .Select(r => r.Value)
            .AverageOrDefaultAsync();

        return avg;
    }

    public async Task<int> GetRatingCountForProjectAsync(Guid projectId)
    {
        return await _ratings
            .CountAsync(r => r.CardId == projectId);
    }
}