using Microsoft.Data.SqlClient;
using DynamicGrid.API.Models;
using DynamicGrid.API.Repositories.Interfaces;

namespace DynamicGrid.API.Repositories.Implementations;

public class EmployeeRepository : IEmployeeRepository
{
    private readonly IConfiguration _configuration;
    public EmployeeRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public List<Employee> GetEmployees(int offset,int pageSize,string orderByClause)
    {
        List<Employee> employees =new List<Employee>();

        string connectionString =_configuration.GetConnectionString("DefaultConnection");

        // creates a database connection
        // ensures it is automatically closed and cleaned up
        using SqlConnection connection =new SqlConnection(connectionString);

        // Interpolated Verbatim String
        string query =$@"SELECT * 
           FROM Employees
           ORDER BY {orderByClause}
           OFFSET @Offset ROWS
           FETCH NEXT @PageSize ROWS ONLY";


        // creates a command object that
        // holds the SQL query
        // knows which database connection to use
        SqlCommand command =new SqlCommand(query,connection);

        command.Parameters.AddWithValue("@Offset",offset);
        command.Parameters.AddWithValue("@PageSize",pageSize);
        connection.Open();

        // it sends your SQL query to the database and starts reading results
        // ExecuteReaderAsync():
        // runs the query
        // returns a SqlDataReader
        SqlDataReader reader =command.ExecuteReader();

        while (reader.Read())
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