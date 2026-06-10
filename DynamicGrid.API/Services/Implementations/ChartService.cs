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

    public List<ChartData> GetDepartmentCount()
    {
        var students =
            _repository.GetStudents();

        return students
            .GroupBy(x => x.Department)
            .Select(group => new ChartData
            {
                Label = group.Key,
                Value = group.Count()
            })
            .ToList();
    }

    public List<ChartData> GetDepartmentAttendance()
    {
        var students =
            _repository.GetStudents();

        return students
            .GroupBy(x => x.Department)
            .Select(group => new ChartData
            {
                Label = group.Key,
                Value = group.Average(x => x.Attendance)
            })
            .ToList();
    }

    public DashboardSummary GetDashboardSummary()
    {
        var students = _repository.GetStudents();

        return new DashboardSummary
        {
            TotalStudents = students.Count,

            TotalDepartments = students
                .Select(x => x.Department)
                .Distinct()
                .Count(),

            AverageAttendance = Math.Round(
                students.Average(x => x.Attendance),
                2)
        };
    }

    
}