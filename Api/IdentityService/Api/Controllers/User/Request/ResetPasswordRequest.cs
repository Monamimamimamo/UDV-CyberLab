using System.ComponentModel.DataAnnotations;

namespace IdentityServerApi.Controllers.User.Request;

public class ResetPasswordRequest
{
    public required string Email { get; set; }

    public required string NewPassword { get; set; }

    public required  string Token { get; set; }
}