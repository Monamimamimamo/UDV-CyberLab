using Core.Cards.DTO;

namespace Core.Cards.Service.Interface
{
    public interface ICommentService
    {
        Task<CommentDto> CreateAsync(CommentCreateDto commentDto, Guid authorId);
        Task<List<CommentDto>> GetCommentsByProjectIdAsync(Guid projectId);
        Task<CommentDto> UpdateAsync(CommentUpdateDto updateDto, Guid userId);
        Task<bool> DeleteAsync(Guid commentId, Guid userId);
        Task<bool> AdminDeleteAsync(Guid commentId);
    }
}
