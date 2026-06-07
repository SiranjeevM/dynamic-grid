using DynamicGrid.API.Models;
using DynamicGrid.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DynamicGrid.API.Controllers;
[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeService _service;
    public EmployeeController(IEmployeeService service)
    {
        _service = service;
    }

    [HttpPost]
    public IActionResult GetEmployees([FromBody] EmployeeRequest request)
    {
        var employees =_service.GetEmployees(request);
        return Ok(employees);
    }
}