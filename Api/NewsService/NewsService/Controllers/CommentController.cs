using Core.Cards.Controllers;
using Core.Cards.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NewsCommentController(ICommentService _commentService) : CommentsController(_commentService)
    {
    }
}