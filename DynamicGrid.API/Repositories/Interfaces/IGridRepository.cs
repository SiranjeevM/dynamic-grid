namespace DynamicGrid.API.Repositories.Interfaces;

public interface IGridRepository
{
    List<Dictionary<string, object?>> GetAllData(string tableName);
}