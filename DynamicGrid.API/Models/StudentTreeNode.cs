namespace DynamicGrid.API.Models;

public class StudentTreeNode
{
    public int Id { get; set; }

    public string Label { get; set; } = "";

    public List<StudentTreeNode> Children { get; set; }= new List<StudentTreeNode>();
}