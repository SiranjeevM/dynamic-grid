using DynamicGrid.API.Models;
using DynamicGrid.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

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

    [HttpGet]
    public IActionResult GetData(string tableName,int pageNumber,int pageSize,string? sortRules)
    {
        GridRequest request = new GridRequest
        {
            TableName = tableName,
            PageNumber = pageNumber,
            PageSize = pageSize
        };

        if (!string.IsNullOrEmpty(sortRules))
        {
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            request.SortRules =JsonSerializer.Deserialize<List<SortRule>>(sortRules,options) ?? new List<SortRule>();
        }
        var result = _service.GetData(request);
        return Ok(result);
    }
}