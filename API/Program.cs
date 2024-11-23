using API.Extensions;
using API.Middleware;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityService(builder.Configuration);
var app = builder.Build();
app.UseCors("CorsPolicy");

// Configure the HTTP request pipeline. middleware
if (app.Environment.IsDevelopment())
{
    app.UseMiddleware<ExceptionMiddleWare>();
    // app.UseSwagger();
    // app.UseSwaggerUI();
}
// using cors at middleware



// app.UseHttpsRedirection();
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

// temporary, using scope is for clean up (garbage collector)
// scope is for http request before controller handles?
/*
Singleton: Created once and shared across the entire application lifetime.
Scoped: Created once per HTTP request.
Transient: Created every time they are requested (new instance for each usage).
*/
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

app.Run();



/*

1. What is using?
The using statement in C# is used to automatically manage the lifetime of objects that implement the IDisposable interface. 
This interface has a method called Dispose(), which is meant to release unmanaged resources 
(like file handles, database connections, network sockets, etc.) when the object is no longer in use.

When you use the using keyword:

The object you create (in this case, scope) is automatically disposed of as soon as the block of code finishes executing.
This means you don't need to manually call Dispose() on the object.


What is CreateScope() Returning?
app.Services.CreateScope() returns an IServiceScope object, which implements IDisposable. 
This scope provides a boundary within which scoped services are resolved, and once it's disposed of, 
any scoped services created within that scope will also be disposed of. 
This is important because it helps prevent resource leaks (like open database connections).



Simplified Explanation:
In short, the using statement makes sure that the temporary scope you created with CreateScope() 
is automatically cleaned up (disposed) after the migration code has run. 
Without using, you'd have to manually call scope.Dispose(), which could be error-prone if you forget to do so.


*/
