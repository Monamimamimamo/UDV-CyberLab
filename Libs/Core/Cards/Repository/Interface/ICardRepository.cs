using Core.Cards.DTO;
using Domain.Interfaces;

namespace Core.Cards.Repository.Interface
{
    public interface ICardRepository : IStandartStore
    {
        Task<List<CardEntity>> GetFilteredCardsAsync(CardFilterDto filter);
        Task<List<CardEntity>> GetUserCardsAsync(Guid userId);
    }
}
