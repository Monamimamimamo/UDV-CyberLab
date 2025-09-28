namespace IdentityServerApi.Controllers.User.Request;

public class ConfirmEmailRequest
{
    public required Guid UserId { get; set; }

    public required string Token { get; set; }
}