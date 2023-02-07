using Application.Followers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FollowController : BaseApiController
    {
        [HttpPost("{userName}")]
        public async Task<IActionResult> Follow(string userName)
        {
            return HandleResult(await Mediator.Send(new FollowToggle.Command{TargetUserName = userName}));
        }
    }
}