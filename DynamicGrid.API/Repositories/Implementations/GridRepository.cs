using Microsoft.Data.SqlClient;
using DynamicGrid.API.Repositories.Interfaces;
 
namespace DynamicGrid.API.Repositories.Implementations;
 
public class GridRepository : IGridRepository
{
    private readonly IConfiguration _configuration;
 
    public GridRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
 
    public List<Dictionary<string, object?>> GetAllData(string tableName)
    {
        List<Dictionary<string, object?>> result = new();
 
        string connectionString =
            _configuration.GetConnectionString("DefaultConnection");
 
        using SqlConnection connection =
            new SqlConnection(connectionString);
 
        string query = $"SELECT * FROM {tableName}";
 
        SqlCommand command =
            new SqlCommand(query, connection);
 
        connection.Open();
 
        SqlDataReader reader =
            command.ExecuteReader();
 
        while (reader.Read())
        {
            Dictionary<string, object?> row = new();
 
            for (int i = 0; i < reader.FieldCount; i++)
            {
                object value = reader.GetValue(i);
 
                row.Add(
                    reader.GetName(i),
                    value == DBNull.Value ? null : value
                );
            }
 
            result.Add(row);
        }
 
        return result;
    }
}
 