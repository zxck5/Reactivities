using Application.Core;

namespace API.Middleware
{
    public class ExceptionMiddleWare(
        RequestDelegate next,
        ILogger<ExceptionMiddleWare> logger,
        IHostEnvironment env)
    {
        private readonly RequestDelegate _next = next;
        private readonly ILogger<ExceptionMiddleWare> _logger = logger;
        private readonly IHostEnvironment _env = env;

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                // context.Response.ContentType = "application/json";

                context.Response.StatusCode = StatusCodes.Status500InternalServerError;

                var response = _env.IsDevelopment()
                    ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new AppException(context.Response.StatusCode, "Internal Server Error");
                // var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                // var json = JsonSerializer.Serialize(response, options);
                await context.Response.WriteAsJsonAsync(response);
            }
        }
    }
}