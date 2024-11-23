using Application.Activities;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Application
{
    public static class DependencyInjectionExtension
    {
        public static IServiceCollection AddApplicationHandlers(this IServiceCollection services)
        {
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(List).Assembly));
            services.AddValidatorsFromAssemblyContaining<ActivityValidator>();
            return services;
        }
    }
}