using System.IdentityModel.Tokens.Jwt;
using Core.BasicRoles;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Services.Interfaces;

namespace Services.Services
{
    public class UserService : IUserService
    {
        private readonly IUserStore _userStore;

        public UserService(IUserStore userStore)
        {
            _userStore = userStore;
        }

        public async Task<bool> IsEmailConfirmedAsync(User user)
        {
            return await _userStore.IsEmailConfirmedAsync(user);
        }

        public async Task<string> GenerateEmailConfirmationTokenAsync(User user)
        {
            var token = await _userStore.GenerateEmailConfirmationTokenAsync(user);

            return token;
        }

        public async Task<IdentityResult> RegisterUserAsync(User user, string password, UserRole role)
        {
            var createResult = await user.CreateAsync(_userStore, password, role.ToString());
            return createResult;
        }

        public async Task<JwtSecurityToken?> LoginUserAsync(User userLogin, string password)
        {
            var token = await _userStore.LoginAsync(userLogin, password);

            return token;
        }

        public async Task<User?> GetUserInfoAsync(Guid userId)
        {
            var user = await _userStore.GetInfoAsync(userId);

            return user;
        }

        public async Task<User?> FindUserByEmail(string email)
        {
            var user = await _userStore.FindUserByEmail(email);

            return user;
        }

        public async Task<string> GeneratePasswordResetTokenAsync(User user)
        {
            var token = await _userStore.GeneratePasswordResetTokenAsync(user);

            return token;
        }

        public Task<IdentityResult> ConfirmEmailAsync(User user, string token)
        {
            return _userStore.ConfirmEmailAsync(user, token);
        }

        public Task<IdentityResult> ResetPasswordAsync(User user, string token, string newPassword)
        {
            return  _userStore.ResetPasswordAsync(user, token, newPassword);
        }

        public async Task<List<User>> GetUsersAsync(string? name)
        {
            var paginatedUsers = await _userStore.SearchByFilter(name);
            return paginatedUsers;
        }

        public async Task<Guid> CheckExistAsync(Guid id)
        {
            var user = await _userStore.CheckExistAsync(id);
            return user?.Id ?? Guid.Empty;
        }
    }
}