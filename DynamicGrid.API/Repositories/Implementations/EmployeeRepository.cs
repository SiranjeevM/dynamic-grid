using DynamicGrid.API.Models;
using DynamicGrid.API.Repositories.Interfaces;

namespace DynamicGrid.API.Repositories.Implementations;

public class EmployeeRepository : IEmployeeRepository
{
    public List<Employee> GetEmployees()
    {
        return new List<Employee>
        {
            new Employee
            {
                Id=1,
                Name="John",
                Department="IT",
                Salary=5000
            },
            new Employee
            {
                Id=2,
                Name="Arun",
                Department="HR",
                Salary=30000
            },            
        };
    }
}