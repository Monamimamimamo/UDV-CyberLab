using AutoMapper;
using Core.Cards.DTO;
using Core.Cards.Repository.Interface;
using Core.Data;
using CRM.Data.Common.Exceptions;
using Domain.DTO;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Service.Interfaces;

namespace Service.Services;

public class ProjectService(
    IFileManager _fileManager,
    ICardRepository _cardRepository,
    IMapper _mapper)
    : IProjectService
{
    public async Task<Guid> CreateAsync(ProjectCardDTO cardDto,
        IFormFile logo,
        IFormFile? photo,
        IFormFile documentation,
        Guid ownerId)
    {
        var card = _mapper.Map<ProjectCard>(cardDto);
        card.Id = Guid.NewGuid();

        var projectDirectory = $"uploads/{card.Id}";

        card.LogoPath = await _fileManager.CreateAsync(logo, projectDirectory, $"logo_{card.Name}");
        card.PhotoPath = await _fileManager.CreateAsync(photo, projectDirectory, $"photo_{card.Name}");
        card.DocumentationPath =
            await _fileManager.CreateAsync(documentation, projectDirectory, $"documentation_{card.Name}");
        card.OwnerId = ownerId;
        card.CreatedAt = DateTime.UtcNow;

        var cardId = await _cardRepository.CreateAsync(card.Id, card);

        return cardId;
    }

    public async Task<ProjectPageDto> GetByIdAsync(Guid id)
    {
        var card = await _cardRepository.GetByIdAsync<ProjectCard>(id);
        if (card == null)
        {
            throw new NotFoundException($"Project with id {id} didn't find.");
        }

        card.ViewsCount++;

        await _cardRepository.UpdateAsync(card);

        return _mapper.Map<ProjectPageDto>(card);
    }

    public async Task<ShortCardDto[]> GetUserProjects(Guid userId)
    {
       var projects = await _cardRepository.GetUserCardsAsync
           (userId);

        return _mapper.Map<ShortCardDto[]>(projects);
    }

    public async Task<ProjectCardFilesResponse> GetProjectFilesAsync(Guid projectId)
    {
        var card = await _cardRepository.GetByIdAsync<ProjectCard>(projectId);

        if (card == null)
            throw new FileNotFoundException($"Project with id {projectId} didn't find.");

        var response = new ProjectCardFilesResponse();

        if (!string.IsNullOrEmpty(card.LogoPath))
        {
            var (logoData, logoMime) = await _fileManager.GetFileWithMimeTypeAsync(card.LogoPath);
            response.Logo = logoData;
            response.LogoMimeType = logoMime;
        }

        if (!string.IsNullOrEmpty(card.PhotoPath))
        {
            var (photoData, photoMime) = await _fileManager.GetFileWithMimeTypeAsync(card.PhotoPath);
            response.Photo = photoData;
            response.PhotoMimeType = photoMime;
        }

        if (!string.IsNullOrEmpty(card.DocumentationPath))
        {
            var (docData, docMime) = await _fileManager.GetFileWithMimeTypeAsync(card.DocumentationPath);
            response.Documentation = docData;
            response.DocumentationMimeType = docMime;
        }

        return response;
    }

    public async Task<(byte[] Data, string MimeType)> GetProjectFileAsync(string path)
    {
        return await _fileManager.GetFileWithMimeTypeAsync(path);
    }

    public async Task<Guid> UpdateAsync(ProjectCardUpdateDto updateDto)
    {
        var existingCard = await _cardRepository.GetByIdAsync<ProjectCard>(updateDto.Id);
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

        if (!string.IsNullOrEmpty(updateDto.LandingURL))
        {
            existingCard.LandingURL = updateDto.LandingURL;
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

        if (updateDto.Documentation != null && updateDto.Documentation.Length > 0)
        {
            if (!string.IsNullOrEmpty(existingCard.DocumentationPath))
            {
                await _fileManager.DeleteAsync(existingCard.DocumentationPath);
            }

            existingCard.DocumentationPath = await _fileManager.CreateAsync(
                updateDto.Documentation,
                projectDirectory,
                $"documentation_{existingCard.Name}");
        }

        await _cardRepository.UpdateAsync(existingCard);

        return existingCard.Id;
    }

    public async Task<ShortCardDto[]> GetFilteredProjectsAsync(CardFilterDto filter)
    {
        var projects = await _cardRepository.GetFilteredCardsAsync(filter);

        var shortCards = _mapper.Map<ShortCardDto[]>(projects);

        return shortCards;
    }

    public async Task<bool> DeleteProjectCardAsync(Guid cardId)
    {
        var card = await _cardRepository.GetByIdAsync<ProjectCard>(cardId);
        if (!string.IsNullOrEmpty(card.DocumentationPath))
        {
            await _fileManager.DeleteAsync(card.DocumentationPath);
        }
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