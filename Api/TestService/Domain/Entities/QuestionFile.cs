namespace Domain.Entities
{
    public record QuestionFile : QuestionBase
    {
        public string InputFilePath { get; set; }
    }
}
