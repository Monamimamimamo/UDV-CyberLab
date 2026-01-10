namespace Api.Controllers.User.Request
{
    public class RoleChangeRequest
    {
        public required Guid UserId { get; set; }
        public required string Role { get; set; }
    }
}
