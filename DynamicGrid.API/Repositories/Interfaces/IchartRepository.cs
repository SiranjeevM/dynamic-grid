using DynamicGrid.API.Models;
 
namespace DynamicGrid.API.Repositories.Interfaces;
 
public interface IChartRepository
{
    List<ChartData> GetDepartmentChart();
}
 