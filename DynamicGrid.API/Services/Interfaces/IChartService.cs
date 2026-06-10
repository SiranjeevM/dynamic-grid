using DynamicGrid.API.Models;

namespace DynamicGrid.API.Services.Interfaces;

public interface IChartService
{
    List<ChartData> GetDepartmentCount();

    List<ChartData> GetDepartmentAttendance();
    DashboardSummary GetDashboardSummary();

    
}