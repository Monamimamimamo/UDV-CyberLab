using Core.ValidateAttributes.Files;
using Domain.DTO.Questions;
using Microsoft.AspNetCore.Http;

namespace Domain.Entities
{
    public record QuestionFileDto : QuestionBaseDto
    {
        [AllowedExtensions([".jpg"])]
        public IFormFile InputFile { get; set; }
    }
}
