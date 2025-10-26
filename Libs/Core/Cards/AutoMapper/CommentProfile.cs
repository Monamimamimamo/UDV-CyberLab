using AutoMapper;
using Core.Cards.DTO;

namespace Core.Cards.AutoMapper
{
    public class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<Comment, CommentDto>();
            CreateMap<CommentCreateDto, Comment>();
            CreateMap<CommentUpdateDto, Comment>();
        }
    }
}