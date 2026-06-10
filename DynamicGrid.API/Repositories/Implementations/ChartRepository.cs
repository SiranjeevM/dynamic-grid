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

    public List<Student> GetStudents()
    {
        List<Student> students = new();

        string connectionString =
            _configuration.GetConnectionString("DefaultConnection");

        using SqlConnection connection =
            new SqlConnection(connectionString);

        string query = "SELECT StudentId, StudentName, Department, Attendance FROM Students";

        SqlCommand command =
            new SqlCommand(query, connection);

        connection.Open();

        SqlDataReader reader =
            command.ExecuteReader();

        while (reader.Read())
        {
            Student student = new Student();

            student.StudentId =
                Convert.ToInt32(reader["StudentId"]);

            student.StudentName =
                reader["StudentName"].ToString()!;

            student.Department =
                reader["Department"].ToString()!;

            student.Attendance =
                Convert.ToInt32(reader["Attendance"]);

            students.Add(student);
        }

        return students;
    }
}