using DynamicGrid.API.Models;

namespace DynamicGrid.API.Services.Interfaces;
public interface IEmployeeService
{
     List<Employee> GetEmployees(EmployeeRequest request);
}
