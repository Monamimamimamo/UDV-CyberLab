using Domain.Interfaces;

namespace Core.Cards.Repository.Interface;

public interface IRatingRepository : IStandartStore
{
    Task<Rating?> GetUserRatingForProjectAsync(Guid projectId, Guid userId);
    Task<List<Rating>> GetAllRatingsForProjectAsync(Guid projectId);
    Task<double> GetAverageRatingForProjectAsync(Guid projectId);
    Task<int> GetRatingCountForProjectAsync(Guid projectId);
}