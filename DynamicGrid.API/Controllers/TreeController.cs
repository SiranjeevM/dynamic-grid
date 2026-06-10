using Microsoft.AspNetCore.Mvc;
using DynamicGrid.API.Services.Interfaces;

namespace DynamicGrid.API.Controllers;

[ApiController]
[Route("api/tree")]
public class TreeController : ControllerBase
{
    private readonly IGridService _service;

    public TreeController(IGridService service)
    {
        _service = service;
    }

    [HttpGet]
    public IActionResult GetTree()
    {
        var data = _service.GetStudentTree();

        return Ok(data);
    }
}