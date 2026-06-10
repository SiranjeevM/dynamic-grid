using DynamicGrid.API.Models;

namespace DynamicGrid.API.Services.Interfaces;

public interface IGridService
{
    List<Dictionary<string, object>> GetData(GridRequest request);
    List<StudentTreeNode> GetStudentTree();
    byte[] ExportToExcel(GridRequest request);
}