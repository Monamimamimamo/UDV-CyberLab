using Core.Cards.Repository.Interface;
using Infrastucture.Data;
using Microsoft.EntityFrameworkCore;

namespace Core.Cards.Repository
{
    public class CommentRepository(DbContext context) : BaseRepository(context), ICommentRepository
    {
        public async Task<List<Comment>> GetCommentsByProjectIdAsync(Guid projectId)
        {
            var set = context.Set<Comment>();
            return await set
                .Where(c => c.CardId == projectId)
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();
        }
    }
}
