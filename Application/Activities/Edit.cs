using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }

        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }
        public class Handler(ILogger<Handler> logger, DataContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context = context;
            private readonly IMapper _mapper = mapper;

            private readonly ILogger<Handler> _logger = logger;

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                // activity.Title = request.Acitivity.Title ?? activity.Title;
                if (activity == null) return null;
                // _mapper.Map(request.Activity, activity);
                activity.EditActivity(request.Activity);
                var result = await _context.SaveChangesAsync() > 0;
                _logger.LogInformation("Check result {0}", result);
                if (!result) return Result<Unit>.Failure("Failed to edit Activity");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}