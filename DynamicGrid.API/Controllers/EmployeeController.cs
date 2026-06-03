using DynamicGrid.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace DynamicGrid.API.Controllers;
[ApiController]
[Route("api/[controller]")]
public class EmployeeController:ControllerBase
{
    private readonly IEmployeeService _service;

    public EmployeeController(IEmployeeService service)
    {
        _service=service;
    }

    [HttpGet]
    public IActionResult GetEmployees()
    {
        var employees=_service.GetEmployees();
        return Ok(employees);
    }
}