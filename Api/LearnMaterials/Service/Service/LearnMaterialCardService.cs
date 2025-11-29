using AutoMapper;
using Core.Cards.DTO;
using Core.Cards.Repository.Interface;
using Core.Data;
using CRM.Data.Common.Exceptions;
using Domain.DTO;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Service.Interfaces;

namespace Service.Service;

public class LearnMaterialCardService(
    IFileManager _fileManager,
    ICardRepository _cardRepository,
    IMapper _mapper)
    : INewsCardService
{
    public async Task<Guid> CreateAsync(LearnMaterialCardDto learnMaterialCardDto, IFormFile logo, IFormFile? photo, Guid ownerId)
    {
        var card = _mapper.Map<LearnMaterialCard>(learnMaterialCardDto);
        card.Id = Guid.NewGuid();

        var projectDirectory = $"uploads/{card.Id}";

        card.LogoPath = await _fileManager.CreateAsync(logo, projectDirectory, $"logo_{card.Name}");
        card.PhotoPath = await _fileManager.CreateAsync(photo, projectDirectory, $"photo_{card.Name}");
        card.OwnerId = ownerId;
        card.CreatedAt = DateTime.UtcNow;

        var cardId = await _cardRepository.CreateAsync(card.Id, card);

        return cardId;
    }

    public async Task<LearnMaterialPageDto> GetByIdAsync(Guid id)
    {
        var card = await _cardRepository.GetByIdAsync<LearnMaterialCard>(id);
        if (card == null)
        {
            throw new NotFoundException($"News with id {id} didn't find.");
        }

        card.ViewsCount++;

        await _cardRepository.UpdateAsync(card);

        return _mapper.Map<LearnMaterialPageDto>(card);
    }

    public async Task<ShortCardDto[]> GetFilteredCardAsync(CardFilterDto filter)
    {
        var projects = await _cardRepository.GetFilteredCardsAsync(filter);

        var shortCards = _mapper.Map<ShortCardDto[]>(projects);

        return shortCards;
    }

    public async Task<Guid> UpdateAsync(LearnMaterialCardUpdateDto updateDto)
    {
        var existingCard = await _cardRepository.GetByIdAsync<LearnMaterialCard>(updateDto.Id);
        if (existingCard == null)
        {
            throw new NotFoundException($"Project with id {updateDto.Id} didn't find.");
        }

        if (!string.IsNullOrEmpty(updateDto.Name))
        {
            existingCard.Name = updateDto.Name;
        }

        if (!string.IsNullOrEmpty(updateDto.Description))
        {
            existingCard.Description = updateDto.Description;
        }

        if (!string.IsNullOrEmpty(updateDto.ShortDescription))
        {
            existingCard.ShortDescription = updateDto.ShortDescription;
        }

        var projectDirectory = $"uploads/{existingCard.Id}";

        if (updateDto.LogoPhoto != null && updateDto.LogoPhoto.Length > 0)
        {
            if (!string.IsNullOrEmpty(existingCard.LogoPath))
            {
                await _fileManager.DeleteAsync(existingCard.LogoPath);
            }

            existingCard.LogoPath = await _fileManager.CreateAsync(
                updateDto.LogoPhoto,
                projectDirectory,
                $"logo_{existingCard.Name}");
        }

        if (updateDto.ProjectPhoto != null && updateDto.ProjectPhoto.Length > 0)
        {
            if (!string.IsNullOrEmpty(existingCard.PhotoPath))
            {
                await _fileManager.DeleteAsync(existingCard.PhotoPath);
            }

            existingCard.PhotoPath = await _fileManager.CreateAsync(
                updateDto.ProjectPhoto,
                projectDirectory,
                $"photo_{existingCard.Name}");
        }

        await _cardRepository.UpdateAsync(existingCard);

        return existingCard.Id;
    }

    public async Task<bool> DeleteProjectCardAsync(Guid cardId)
    {
        var card = await _cardRepository.GetByIdAsync<LearnMaterialCard>(cardId);
        if (!string.IsNullOrEmpty(card.PhotoPath))
        {
            await _fileManager.DeleteAsync(card.PhotoPath);
        }

        if (!string.IsNullOrEmpty(card.LogoPath))
        {
            await _fileManager.DeleteAsync(card.LogoPath);
        }

        return card != null && await _cardRepository.DeleteAsync(card);
    }
}