using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivityDTO>>> { }

        public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Query, Result<List<ActivityDTO>>>
        {
            private readonly DataContext _context = context;
            private readonly IMapper _mapper = mapper;
            public async Task<Result<List<ActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities
                    .ProjectTo<ActivityDTO>(_mapper.ConfigurationProvider) // you can use Select()
                                                                           // .Include(a => a.Attendees)
                                                                           // .ThenInclude(u => u.AppUser)
                    .ToListAsync();
                // var activitiesToReturn = _mapper.Map<List<ActivityDTO>>(activities);

                return Result<List<ActivityDTO>>.Success(activities);
            }
        }

    }
}