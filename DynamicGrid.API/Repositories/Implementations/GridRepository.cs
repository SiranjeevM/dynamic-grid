using Microsoft.Data.SqlClient;
using DynamicGrid.API.Repositories.Interfaces;

namespace DynamicGrid.API.Repositories.Implementations;

public class GridRepository : IGridRepository
{
    private readonly IConfiguration _configuration;

    public GridRepository(
        IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public List<Dictionary<string, object>> GetData(string tableName,int offset,int pageSize,string orderByClause){
        List<Dictionary<string, object>>result =new();

        string connectionString =_configuration.GetConnectionString("DefaultConnection");

        using SqlConnection connection =new SqlConnection(connectionString);

        string query =
        $@"SELECT *
        FROM {tableName}
        ORDER BY {orderByClause}
        OFFSET @Offset ROWS
        FETCH NEXT @PageSize ROWS ONLY";

        SqlCommand command =new SqlCommand(query,connection);
        command.Parameters.AddWithValue("@Offset",offset);
        command.Parameters.AddWithValue("@PageSize",pageSize);
        connection.Open();

        SqlDataReader reader =command.ExecuteReader();
        while (reader.Read())
        {
            Dictionary<string, object> row =new();

            for (int i = 0;i < reader.FieldCount;i++)
            {
                row.Add(reader.GetName(i),reader.GetValue(i));
            }
            result.Add(row);
        }
        return result;
    }

}