using Domain.Interfaces;

namespace Core.Cards.Repository.Interface
{
    public interface ICommentRepository : IStandartStore
    {
        Task<List<Comment>> GetCommentsByProjectIdAsync(Guid projectId);
    }
}
