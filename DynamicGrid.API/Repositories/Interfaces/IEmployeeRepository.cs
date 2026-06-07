using DynamicGrid.API.Models;

namespace DynamicGrid.API.Repositories.Interfaces;
public interface IEmployeeRepository
{
        List<Employee> GetEmployees(int offset,int pageSize,string orderByClause);
}