using Core.Cards.DTO;
using Core.Cards.Service.Interface;
using ExampleCore.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Core.Cards.Controllers
{
    public abstract class CommentsController(ICommentService _commentService) : ControllerBase
    {
        [HttpGet("{cardId}")]
        public async Task<IActionResult> GetComments(Guid cardId)
        {
            var comments = await _commentService.GetCommentsByProjectIdAsync(cardId);
            return Ok(comments);
        }

        [HttpPost]
        public async Task<IActionResult> CreateComment([FromBody] CommentCreateDto commentDto)
        {
            var userId = UserHelper.GetUserId(HttpContext.Request);

            var comment = await _commentService.CreateAsync(commentDto, userId);
            return Ok(comment);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateComment([FromBody] CommentUpdateDto updateDto)
        {
            var userId = UserHelper.GetUserId(HttpContext.Request);
            var updatedComment = await _commentService.UpdateAsync(updateDto, userId);
            return Ok(updatedComment);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(Guid id)
        {
            var userId = UserHelper.GetUserId(HttpContext.Request);
            var result = await _commentService.DeleteAsync(id, userId);
            return Ok(result);
        }
    }
}
