using geometric_clash.Data;
using geometric_clash.helpers;
using geometric_clash.Interfaces;
using geometric_clash.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace geometric_clash.Extentions
{
    public static class ApplicationServiceExtentions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
             services.AddScoped<ITokenService, TokenService>();
            string mySqlConnectionStr = "server=remotemysql.com; port=3306; database=LHKOaYeYJq; user=LHKOaYeYJq; password=fgf9oxE0e0;";
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContextPool<DataContext>(options => options.UseMySql(mySqlConnectionStr, ServerVersion.AutoDetect(mySqlConnectionStr)));
            return services;
        }
    }
}