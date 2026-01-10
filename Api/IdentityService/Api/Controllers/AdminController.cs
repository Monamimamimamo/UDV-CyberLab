using Api.Controllers.User.Request;
using IdentityServerApi.Controllers.User.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
//[Authorize(Roles = "ADMIN")]
public class AdminController : ControllerBase
{
    private readonly IAdminService _adminService;
    private readonly IUserService _userService;

    public AdminController(IAdminService adminService, IUserService userService)
    {
        _adminService = adminService;
        _userService = userService;
    }

    [HttpDelete("user/{userId}")]
    public async Task<IActionResult> DeleteUser(Guid userId)
    {
        await _adminService.DeleteUserAsync(userId);

        return NoContent();
    }

    [HttpGet("users")]
    [Authorize]
    public async Task<ActionResult<ICollection<UserInfoResponse>>> GetUsers(string? searchName = null)
    {
        var users = await _userService.GetUsersAsync(searchName);
        return users.Select(user => new UserInfoResponse
        {
            UserId = user.Id,
            UserName = user.UserName,
            Email = user.Email,
            Role = user.Role
        }).ToList();
    }

    [HttpPost("changeRole")]
    public async Task<IActionResult> ChangeRole([FromBody] RoleChangeRequest request)
    {
        var user = await _userService.GetUserInfoAsync(request.UserId);
        if (user is null)
        {
            return BadRequest(new { Message = "Нет такого пользователя." });
        }
        await _userService.RemoveFromRoleAsync(user, user.Role.ToString());
        var result = await _userService.AddToRoleAsync(user, request.Role);

        if (result.Succeeded)
        {
            return Ok(new { Message = $"Роль пользователя {user.UserName} изменена с {user.Role} на {request.Role}" });
        }

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(string.Empty, error.Description);
        }

        return BadRequest(ModelState);
    }
}