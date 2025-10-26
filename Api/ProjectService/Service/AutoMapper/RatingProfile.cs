using AutoMapper;
using Core.Cards;
using Domain.DTO;
using Domain.Entities;

namespace Service.AutoMapper
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