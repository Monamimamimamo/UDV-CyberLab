namespace IdentityServerApi.Controllers.User.Request;

public record ForgotPasswordRequest
{
    public required string Email { get; set; }
}