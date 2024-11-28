using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Result<ActivityDTO>>
        {
            public Guid Id { get; set; }
        }
        public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Query, Result<ActivityDTO>>
        {
            private readonly DataContext _context = context;
            private readonly IMapper _mapper = mapper;
            public async Task<Result<ActivityDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                // var activity = await _context.Activities.FindAsync(request.Id);
                var activity = await _context.Activities
                    .ProjectTo<ActivityDTO>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);
                return Result<ActivityDTO>.Success(activity);
            }
        }
    }
}