using Core.Cards.DTO;
using Core.Cards.Repository.Interface;
using Infrastucture.Data;
using Microsoft.EntityFrameworkCore;

namespace Core.Cards.Repository
{
    public class CardRepository(DbContext context) : BaseRepository(context), ICardRepository
    {
        public async Task<List<CardEntity>> GetFilteredCardsAsync(CardFilterDto filter)
        {
            IQueryable<CardEntity> query = context.Set<CardEntity>();

            if (!string.IsNullOrEmpty(filter.Name))
                query = query.Where(p =>
                    EF.Functions.Like(p.Name.ToLower(), $"%{filter.Name.ToLower()}%"));

            query = filter.SortOrder switch
            {
                SortOrder.ByRating => query.OrderByDescending(p => p.Rating),
                SortOrder.ByViews => query.OrderByDescending(p => p.ViewsCount),
                SortOrder.ByNameAsc => query.OrderBy(p => p.Name),
                SortOrder.ByNameDesc => query.OrderByDescending(p => p.Name),
                SortOrder.ByCreationDate => query.OrderBy(p => p.CreatedAt),
                _ => query.OrderByDescending(p => p.Rating)
            };

            return await query.ToListAsync();
        }

        public async Task<List<CardEntity>> GetUserCardsAsync(Guid userId)
        {
            var query = context.Set<CardEntity>().Where(c => c.OwnerId == userId);

            return await query.ToListAsync();
        }
    }
}
