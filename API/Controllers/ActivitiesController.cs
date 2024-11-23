using Application.Activities;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController(ILogger<ActivitiesController> logger) : BaseApiController
    {
        // private readonly IMediator _mediator = mediator;
        private readonly ILogger<ActivitiesController> _logger = logger;

        [HttpGet] //api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }


        [Authorize]
        [HttpGet("{id}")] //api/activities/sdfsdf
        public async Task<IActionResult> GetActivity(Guid id)
        {
            var result = await Mediator.Send(new Details.Query { Id = id });
            return HandleResult(result);
        }

        // IActionResult --> get access to HttpResponse
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            await Mediator.Send(new Create.Command { Activity = activity });
            return Ok();

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            // _logger.LogInformation("HELLO, ID : {0}", id);
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}