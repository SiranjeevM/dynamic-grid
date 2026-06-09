using DynamicGrid.API.Models;
using DynamicGrid.API.Repositories.Interfaces;
using Microsoft.Data.SqlClient;
 
namespace DynamicGrid.API.Repositories.Implementations;
 
public class ChartRepository : IChartRepository
{
    private readonly IConfiguration _configuration;
    public ChartRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
 
    public List<ChartData> GetDepartmentChart()
    {
        List<ChartData> result = new();
        string connectionString = _configuration.GetConnectionString("DefaultConnection");
        using SqlConnection connection =new SqlConnection(connectionString);
        connection.Open();
 
        string query = @"
            SELECT
            Department,
            COUNT(*) AS TotalStudents
            FROM Students
            GROUP BY Department";
 
        SqlCommand command =new SqlCommand(query, connection);
        SqlDataReader reader =command.ExecuteReader();
        while (reader.Read())
        {
            result.Add(new ChartData
            {
                Label = reader["Department"].ToString()!,
                Value = Convert.ToInt32(reader["TotalStudents"])
            });
        }
        return result;
    }
}
 