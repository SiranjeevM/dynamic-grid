using DynamicGrid.API.Models;
using DynamicGrid.API.Repositories.Interfaces;
using DynamicGrid.API.Services.Interfaces;

namespace DynamicGrid.API.Services.Implementations;

public class GridService : IGridService
{
    private readonly IGridRepository _repository;
    public GridService(IGridRepository repository)
    {
        _repository = repository;
    }

    public List<Dictionary<string, object>> GetData(GridRequest request)
    {
        if (request.PageNumber < 1)
        {
            request.PageNumber = 1;
        }

        if (request.PageSize < 1)
        {
            request.PageSize = 10;
        }
        // callculating the offset
        int offset = (request.PageNumber - 1) * request.PageSize;
        // Convert the sortRules into sql format and build sql dynamically
        string orderByClause = BuildOrderByClause(request.SortRules);
        return _repository.GetData(request.TableName, offset, request.PageSize, orderByClause);
    }
    private string BuildOrderByClause(List<SortRule> sortRules)
    {
        if (sortRules.Count == 0)
        {
            return "1";
        }
        string orderBy = "";
        foreach (var rule in sortRules)
        {
            if (orderBy.Contains(rule.Column + " "))
            {
                continue;
            }
            orderBy += $"{rule.Column} {rule.Order},";
        }
        return orderBy.TrimEnd(',');
    }
}