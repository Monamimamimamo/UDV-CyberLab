using Core.Data;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    namespace Api.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        public class TestFilesController(IFileManager _fileManager) : ControllerBase
        {
            [HttpGet("file")]
            public async Task<IActionResult> GetFile(Guid id)
            {
                try
                {
                    var file = await _fileManager.GetFileWithMimeTypeAsync($"Questions/{id.ToString()}.jpg");
                    return Ok(file);
                }
                catch (FileNotFoundException ex)
                {
                    return NotFound(ex.Message);
                }
            }
        }
    }
}
