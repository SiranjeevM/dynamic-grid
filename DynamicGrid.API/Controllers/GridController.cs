using DynamicGrid.API.Models;
using DynamicGrid.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DynamicGrid.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GridController : ControllerBase
{
    private readonly IGridService _service;

    public GridController(IGridService service)
    {
        _service = service;
    }

    [HttpPost]
    public IActionResult GetData([FromBody] GridRequest request)
    {
        var result = _service.GetData(request);
        return Ok(result);
    }
}