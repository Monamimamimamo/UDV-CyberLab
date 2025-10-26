using Core.Cards;
using Core.Cards.Repository.Interface;
using Infrastucture.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class CommentRepository(ProjectsDbContext context) : BaseRepository(context), ICommentRepository
{
    public async Task<List<Comment>> GetCommentsByProjectIdAsync(Guid projectId)
    {
        return await context.Comments
            .Where(c => c.CardId == projectId)
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync();
    }
}