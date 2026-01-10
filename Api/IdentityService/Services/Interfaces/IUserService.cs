using System.IdentityModel.Tokens.Jwt;
using Core.BasicRoles;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Services.Interfaces
{
    public interface IUserService
    {
        Task<IdentityResult> RegisterUserAsync(User user, string Password, UserRole role);
        Task<JwtSecurityToken?> LoginUserAsync(User userLogin, string password);
        Task<User?> GetUserInfoAsync(Guid userId);
        Task<List<User>> GetUsersAsync(string? name);
        Task<string> GenerateEmailConfirmationTokenAsync(User user);
        Task<bool> IsEmailConfirmedAsync(User user);
        Task<User?> FindUserByEmail(string email);
        Task<string> GeneratePasswordResetTokenAsync(User user);
        Task<IdentityResult> ConfirmEmailAsync(User user, string token);
        Task<IdentityResult> ResetPasswordAsync(User user, string token, string newPassword);
        Task<IdentityResult> AddToRoleAsync(User user, string role);
        Task<IdentityResult> RemoveFromRoleAsync(User user, string role);
    }
}