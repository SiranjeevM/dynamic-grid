using Microsoft.Data.SqlClient;
using DynamicGrid.API.Models;
using DynamicGrid.API.Repositories.Interfaces;

namespace DynamicGrid.API.Repositories.Implementations;

public class EmployeeRepository : IEmployeeRepository
{
    private readonly IConfiguration _configuration;

    public EmployeeRepository(
        IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<List<Employee>> GetEmployees(int offset,int pageSize,string orderByClause)
    {
        List<Employee> employees =new List<Employee>();

        string connectionString =_configuration.GetConnectionString("DefaultConnection");
        using SqlConnection connection =new SqlConnection(connectionString);
        string query =$@"SELECT *
           FROM Employees
           ORDER BY {orderByClause}
           OFFSET @Offset ROWS
           FETCH NEXT @PageSize ROWS ONLY";

        SqlCommand command =new SqlCommand(query,connection);

        command.Parameters.AddWithValue("@Offset",offset);

        command.Parameters.AddWithValue("@PageSize",pageSize);

        await connection.OpenAsync();

        SqlDataReader reader =await command.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
            Employee employee =new Employee();

            employee.Id =Convert.ToInt32(reader["Id"]);

            employee.Name =reader["Name"].ToString();

            employee.Department =reader["Department"].ToString();

            employee.Salary =Convert.ToDecimal(reader["Salary"]);
            employees.Add(employee);
        }

        return employees;
    }
}