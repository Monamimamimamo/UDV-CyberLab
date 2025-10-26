namespace Core.Cards.DTO;
public class CommentCreateDto
{
    public required string Text { get; set; }
    public required Guid CardId { get; set; }

    public required string UserName { get; set; }
}