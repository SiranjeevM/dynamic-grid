using DynamicGrid.API.Models;

namespace DynamicGrid.API.Repositories.Interfaces;

public interface IGridRepository
{
    List<Dictionary<string, object>> GetData(string tableName,int offset,int pageSize,string orderByClause);
}