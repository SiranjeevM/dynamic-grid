using DynamicGrid.API.Models;
using DynamicGrid.API.Repositories.Interfaces;
using DynamicGrid.API.Services.Interfaces;

namespace DynamicGrid.API.Services.Implementation;
public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _repository;

    public EmployeeService(IEmployeeRepository repository)
    {
        _repository=repository;
    }
    public List<Employee> GetEmployees()
    {
        return _repository.GetEmployees();
    }
}