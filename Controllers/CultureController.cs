using Microsoft.AspNetCore.Mvc;

namespace Adoztech.Web.Controllers;

public sealed class CultureController : Controller
{
    [HttpGet("/")]
    public IActionResult RootRedirect() => Redirect("/tr");
}
