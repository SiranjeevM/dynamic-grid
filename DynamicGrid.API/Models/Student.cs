namespace DynamicGrid.API.Models;

public class Student
{
    public int StudentId { get; set; }
    public string StudentName { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public int Attendance { get; set; }
}