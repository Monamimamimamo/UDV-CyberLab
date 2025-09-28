using Core.ValidateAttributes.Files;
using Domain.DTO.Questions;
using Microsoft.AspNetCore.Http;

namespace Domain.Entities
{
    public record QuestionFileDto : QuestionBaseDto
    {
        [AllowedExtensions([".png", ".jpg", ".jpeg"])]
        public IFormFile InputFile { get; set; }
    }
}
