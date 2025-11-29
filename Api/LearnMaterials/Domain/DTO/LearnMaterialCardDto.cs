using Core.ValidateAttributes.Files;
using Microsoft.AspNetCore.Http;

namespace Domain.DTO
{
    public class LearnMaterialCardDto
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public string? ShortDescription { get; set; }
        public required string OwnerName { get; set; }
        public required string PublicationType { get; set; }
        public string? URL { get; set; }

        [AllowedExtensions([".png", ".jpg", ".jpeg"])]
        public required IFormFile LogoPhoto { get; set; }

        [AllowedExtensions([".png", ".jpg", ".jpeg"])]
        public IFormFile? ProjectPhoto { get; set; }
    }
}