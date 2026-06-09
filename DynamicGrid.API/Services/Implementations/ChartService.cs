using DynamicGrid.API.Models;
using DynamicGrid.API.Repositories.Interfaces;
using DynamicGrid.API.Services.Interfaces;
 
namespace DynamicGrid.API.Services.Implementations;
public class ChartService : IChartService
{
    private readonly IChartRepository _repository;
    public ChartService(IChartRepository repository)
    {
        _repository = repository;
    }
 
    public List<ChartData> GetDepartmentChart()
    {
        return _repository.GetDepartmentChart();
    }
}
 