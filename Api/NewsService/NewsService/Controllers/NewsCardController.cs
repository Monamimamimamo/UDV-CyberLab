using Core.Cards.DTO;
using Domain.DTO;
using ExampleCore.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;


namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class NewsCardController(INewsCardService _projectService) : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<IActionResult> GetNewsCard(Guid id)
    {
        var card = await _projectService.GetByIdAsync(id);
        return Ok(card);
    }

    [HttpGet("allShort")]
    public async Task<IActionResult> GetAllShortCards([FromQuery] SortOrder sortOrder = SortOrder.Default,
        [FromQuery] string? searchQuery = null)
    {
        var filter = new CardFilterDto
        {
            SortOrder = sortOrder,
            Name = searchQuery
        };

        var filteredProjects = await _projectService.GetFilteredCardAsync(filter);
        return Ok(filteredProjects);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProjectCard([FromForm] NewsCardDto request)
    {
        var ownerId = UserHelper.GetUserId(HttpContext.Request);

        var guid = await _projectService.CreateAsync(request, request.LogoPhoto, request.ProjectPhoto, ownerId);

        return Ok(guid);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProjectCard([FromForm] NewsCardUpdateDto request)
    {
        var guid = await _projectService.UpdateAsync(request);

        return Ok(guid);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteProjectCard(Guid id)
    {
        var response = await _projectService.DeleteProjectCardAsync(id);

        return response ? Ok("Deleted") : NotFound($"No cards with id {id}");
    }
}