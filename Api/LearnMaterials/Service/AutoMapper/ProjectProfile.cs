using AutoMapper;
using Domain.DTO;
using Domain.Entities;

namespace Service.AutoMapper
{
    public class ProjectProfile : Profile
    {
        public ProjectProfile()
        {
            CreateMap<LearnMaterialCard, LearnMaterialCardDto>().ReverseMap();
            CreateMap<LearnMaterialCard, LearnMaterialPageDto>().ReverseMap();
            CreateMap<LearnMaterialCard, ShortCardDto>().ReverseMap();
        }
    }
}