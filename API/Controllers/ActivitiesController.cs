using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController(DataContext context) : BaseApiController
    {
        private readonly DataContext _context = context;
        
        [HttpGet] //api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")] //api/activities/sdfsdf
        public async Task<ActionResult<Activity>> GetActivities(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }
    }
}