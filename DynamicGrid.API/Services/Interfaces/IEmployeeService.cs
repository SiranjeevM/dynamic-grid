using DynamicGrid.API.Models;

namespace DynamicGrid.API.Services.Interfaces;
public interface IEmployeeService
{
     Task<List<Employee>> GetEmployees(EmployeeRequest request);
}