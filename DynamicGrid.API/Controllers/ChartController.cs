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

    [HttpGet("department-count")]
    public IActionResult DepartmentCount()
    {
        return Ok(
            _service.GetDepartmentCount()
        );
    }

    [HttpGet("attendance")]
    public IActionResult Attendance()
    {
        return Ok(
            _service.GetDepartmentAttendance()
        );
    }
}