using AutoMapper;
using Domain.DTO;
using Domain.Entities;

namespace Service.AutoMapper
{
    public class ProjectProfile : Profile
    {
        public ProjectProfile()
        {
            CreateMap<NewsCard, NewsCardDto>().ReverseMap();
            CreateMap<NewsCard, NewsPageDto>().ReverseMap();
            CreateMap<NewsCard, ShortCardDto>().ReverseMap();
        }
    }
}