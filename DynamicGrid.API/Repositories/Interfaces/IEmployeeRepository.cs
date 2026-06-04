using DynamicGrid.API.Models;

namespace DynamicGrid.API.Repositories.Interfaces;
public interface IEmployeeRepository
{
        Task<List<Employee>> GetEmployees(int offset,int pageSize,string orderByClause);
        Task<List<string>> GetColumnNames(string tableName);
}