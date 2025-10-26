using Core.Cards.DTO;
using Domain.DTO;
using Microsoft.AspNetCore.Http;

namespace Service.Interfaces;

public interface INewsCardService
{
    Task<Guid> CreateAsync(NewsCardDto card,
        IFormFile logo,
        IFormFile? photo,
        Guid ownerId);
    Task<NewsPageDto> GetByIdAsync(Guid id);
    Task<ShortCardDto[]> GetFilteredCardAsync(CardFilterDto filter);
    Task<Guid> UpdateAsync(NewsCardUpdateDto updateDto);
    Task<bool> DeleteProjectCardAsync(Guid cardId);
}