using System.IdentityModel.Tokens.Jwt;
using Domain.Entities;
using IdentityServerApi.Controllers.User.Request;
using Infrastucture.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Services.Interfaces;

namespace Api.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthorizeController(IUserService _userService,
    IOptionsSnapshot<ClientAppSettings> _clientSettings, IEmailSender _emailSender)
    : ControllerBase
{
    private readonly ClientAppSettings _clientAppSettings = _clientSettings.Value;


    [HttpPost("register")]
    public async Task<ActionResult<int>> Register([FromBody] UserRegisterRequest model)
    {
        var user = new User
        {
            UserName = model.UserName,
            Email = model.Email
        };

        var registerResult = await _userService.RegisterUserAsync(user, model.Password, model.Role);
        if (registerResult.Succeeded)
        {
            var token = await _userService.GenerateEmailConfirmationTokenAsync(user);
            var encodedToken = Uri.EscapeDataString(token);
            var confirmationLink = $"{_clientAppSettings.EmailConfirmationUrl}?userId={user.Id}&token={encodedToken}";

            await _emailSender.SendEmailAsync(user.Email, "Подтвердите ваш аккаунт",
                $"Пожалуйста, подтвердите регистрацию, перейдя по <a href='{confirmationLink}'>ссылке</a>.");

            return StatusCode(201);
        }

        foreach (var error in registerResult.Errors)
        {
            ModelState.AddModelError(string.Empty, error.Description);
        }

        return BadRequest(ModelState);
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] UserLoginRequest model)
    {
        var token = await _userService.LoginUserAsync(new User
        {
            Email = model.Email
        }, model.Password);

        if (token is null)
        {
            return Unauthorized();
        }

        return Ok(new
        {
            token = new JwtSecurityTokenHandler().WriteToken(token),
            expiration = token.ValidTo
        });
    }

    [HttpPost("forgotPassword")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = await _userService.FindUserByEmail(model.Email);
        if (user is null || !(await _userService.IsEmailConfirmedAsync(user)))
        {
            return Ok(new { Message = "Если аккаунт с такой почтой существует, мы отправили ссылку для сброса пароля." });
        }

        var token = await _userService.GeneratePasswordResetTokenAsync(user);
        var encodedToken = Uri.EscapeDataString(token);

        var resetLink = $"{_clientAppSettings.PasswordResetUrl}?email={user.Email}&token={encodedToken}";

        await _emailSender.SendEmailAsync(
            model.Email,
            "Сброс пароля",
            $"Для сброса пароля перейдите по <a href='{resetLink}'>ссылке</a>.");

        return Ok(new { Message = "Если аккаунт с такой почтой существует, мы отправили ссылку для сброса пароля." });
    }

    [HttpPost("confirmEmail")]
    public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailRequest model)
    {
        var user = await _userService.GetUserInfoAsync(model.UserId);
        if (user is null)
        {
            return NotFound(new { Message = "Пользователь не найден." });
        }

        var result = await _userService.ConfirmEmailAsync(user, model.Token);

        if (result.Succeeded)
        {
            return Ok(new { Message = "Email успешно подтвержден. Теперь вы можете войти." });
        }

        return BadRequest(new { Message = "Не удалось подтвердить Email. Попробуйте ещё раз." });
    }

    [HttpPost("resetPassword")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest model)
    {
        var user = await _userService.FindUserByEmail(model.Email);
        if (user is null)
        {
            return BadRequest(new { Message = "Не удалось сбросить пароль." });
        }

        var result = await _userService.ResetPasswordAsync(user, model.Token, model.NewPassword);

        if (result.Succeeded)
        {
            return Ok(new { Message = "Пароль успешно сброшен. Теперь вы можете войти с новым паролем." });
        }

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(string.Empty, error.Description);
        }

        return BadRequest(ModelState);
    }
}