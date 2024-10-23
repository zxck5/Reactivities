using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Acitivity {get;set;}
        }
        public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Command>
        {
            private readonly DataContext _context = context;
            private readonly IMapper _mapper = mapper;

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Acitivity.Id);
                // activity.Title = request.Acitivity.Title ?? activity.Title;
                _mapper.Map(request.Acitivity, activity);
                await _context.SaveChangesAsync();
            }
        }
    }
}