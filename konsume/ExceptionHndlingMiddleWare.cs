using System.Net;
using System.Text.Json;

namespace KONSUME
{
    public class ExceptionHndlingMiddleWare
    {
            private readonly RequestDelegate _next;
            private readonly ILogger<ExceptionHndlingMiddleWare> _logger;

            public ExceptionHndlingMiddleWare(RequestDelegate next, ILogger<ExceptionHndlingMiddleWare> logger)
            {
                _next = next;
                _logger = logger;
            }

            public async Task InvokeAsync(HttpContext httpContext)
            {
                try
                {
                    await _next(httpContext);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "An unhandled exception occurred.");
                    await HandleExceptionAsync(httpContext, ex);
                }
            }

            private static Task HandleExceptionAsync(HttpContext context, Exception exception)
            {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                var result = JsonSerializer.Serialize(new { error = "An unexpected error occurred. Please try again later." });
                return context.Response.WriteAsync(result);
            }
       
    }
}
