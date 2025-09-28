using Amazon.Runtime;
using Amazon.S3;
using Core.Data;
using Domain.Interfaces;
using Infrastructure;
using Infrastructure.Data;
using Infrastucture.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Service.interfaces;

public static class InfrastuctureStartUp
{
    public static IServiceCollection TryAddInfrastucture(this IServiceCollection serviceCollection,
        IConfigurationManager configurationManager)
    {
        serviceCollection.TryAddScoped<IStandartStore, BaseRepository>();
        serviceCollection.TryAddScoped<ITestStore, TestRepository>();
        serviceCollection.TryAddScoped<IQuestionStore, QuestionRepository>();
        serviceCollection.TryAddScoped<IUserAnswerRepository, UserAnswerRepository>();
        serviceCollection.TryAddScoped<IUserTestRepository, UserTestRepository>();
        var awsOptions = new AmazonS3Config
        {
            ServiceURL = configurationManager["YandexStorage:ServiceUrl"]
        };

        serviceCollection.AddSingleton<IAmazonS3>(sp =>
            new AmazonS3Client(
                new BasicAWSCredentials(
                    configurationManager["YandexStorage:AccessKey"],
                    configurationManager["YandexStorage:SecretKey"]),
                awsOptions));
        serviceCollection.TryAddScoped<IFileManager, FileManager>();

        var connectionString = configurationManager.GetConnectionString("DefaultConnection");

        serviceCollection.AddDbContext<ApplicationDbContext>(options => { options.UseNpgsql(connectionString); });

        serviceCollection.AddScoped<DbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

        return serviceCollection;
    }
}