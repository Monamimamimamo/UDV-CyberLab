
using Microsoft.AspNetCore.Http;

namespace Core.Data
{
    public interface IFileManager
    {
        Task<string> CreateAsync(IFormFile? file, string projectDirectory, string fileName);
        Task<(byte[] Data, string MimeType)> GetFileWithMimeTypeAsync(string filePath);
        Task DeleteAsync(string objectKey);
    }
}
