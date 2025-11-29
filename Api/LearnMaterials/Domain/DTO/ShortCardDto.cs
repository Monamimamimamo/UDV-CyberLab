namespace Domain.DTO;

public class ShortCardDto
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string ShortDescription { get; set; }
    public required string LogoPath { get; set; }
    public required string PublicationType { get; set; }
}