using DynamicGrid.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc; 
namespace DynamicGrid.API.Controllers;
 
[ApiController]
[Route("api/[controller]")]
public class ChartController : ControllerBase
{
    private readonly IChartService _service;
    public ChartController(IChartService service)
    {
        _service = service;
    }
 
    [HttpGet]
    public IActionResult GetChart()
    {
        var result =_service.GetDepartmentChart();
        return Ok(result);
    }
}
 