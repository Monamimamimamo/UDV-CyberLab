using AutoMapper;
using Core.Cards.DTO;

namespace Core.Cards.AutoMapper
{
    public class RatingProfile : Profile
    {
        public RatingProfile()
        {
            CreateMap<Rating, RatingDto>();
            CreateMap<RatingCreateDto, Rating>();
            CreateMap<RatingUpdateDto, Rating>();
        }
    }
}