using Domain.Entities;
using Domain.Interfaces;
using ExampleCore.AuthOptions;
using Infrastucture;
using Infrastucture.Data;
using Infrastucture.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Services.Interfaces;

public static class InfrastuctureStartUp
{
    public static IServiceCollection TryAddInfrastucture(this IServiceCollection serviceCollection, IConfigurationManager configurationManager)
    {
        serviceCollection.AddIdentity<User, IdentityRole<Guid>>(options =>
        {
            options.User.RequireUniqueEmail = true;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireDigit = true;
            options.Password.RequireLowercase = false;
            options.Password.RequireUppercase = true;
            options.SignIn.RequireConfirmedAccount = true;
        })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

        serviceCollection.AddAuth();

        serviceCollection.AddScoped<IUserStore, UserRepository>();
        serviceCollection.AddScoped<IEmailSender, SmtpEmailSender>();
        serviceCollection.AddHostedService<RoleSeeder>();

        var connectionString = configurationManager.GetConnectionString("DefaultConnection");

        serviceCollection.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(connectionString);
        });

        serviceCollection.Configure<SmtpSettings>(configurationManager.GetSection("SmtpSettings"));
        serviceCollection.Configure<ClientAppSettings>(configurationManager.GetSection("ClientAppSettings"));

        return serviceCollection;
    }
}