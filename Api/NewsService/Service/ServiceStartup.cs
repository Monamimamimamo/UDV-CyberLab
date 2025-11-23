using Core.Cards.AutoMapper;
using Core.Cards.Service;
using Core.Cards.Service.Interface;
using Microsoft.Extensions.DependencyInjection;
using Service.AutoMapper;
using Service.Interfaces;
using Service.Service;
using RatingService = Core.Cards.Service.RatingService;

namespace Service;

public static class ServiceStartUp
{
    public static IServiceCollection TryAddServices(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<INewsCardService, NewsCardService>();
        serviceCollection.AddScoped<ICommentService, CommentService>();
        serviceCollection.AddScoped<IRatingService, RatingService>();
        AddAutoMapper(serviceCollection);
        return serviceCollection;
    }

    private static void AddAutoMapper(IServiceCollection services)
    {
        services.AddAutoMapper(
            typeof(ProjectProfile),
            typeof(CommentProfile),
            typeof(RatingProfile));
    }
}