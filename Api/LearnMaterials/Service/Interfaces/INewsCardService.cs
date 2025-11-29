using Core.Cards.DTO;
using Domain.DTO;
using Microsoft.AspNetCore.Http;

namespace Service.Interfaces;

public interface INewsCardService
{
    Task<Guid> CreateAsync(LearnMaterialCardDto card,
        IFormFile logo,
        IFormFile? photo,
        Guid ownerId);
    Task<LearnMaterialPageDto> GetByIdAsync(Guid id);
    Task<ShortCardDto[]> GetFilteredCardAsync(CardFilterDto filter);
    Task<Guid> UpdateAsync(LearnMaterialCardUpdateDto updateDto);
    Task<bool> DeleteProjectCardAsync(Guid cardId);
}