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

    public List<Dictionary<string, object?>> GetData(GridRequest request)
    {
        if (request.PageNumber < 1)
        {
            request.PageNumber = 1;
        }

        if (request.PageSize < 1)
        {
            request.PageSize = 10;
        }
        var allData = _repository.GetAllData(request.TableName);
        var sortedData = ApplySorting(allData, request.SortRules);
        int skip = (request.PageNumber - 1) * request.PageSize;

        return sortedData.Skip(skip).Take(request.PageSize).ToList();
    }

    private List<Dictionary<string, object?>> ApplySorting(List<Dictionary<string, object?>> data,List<SortRule> sortRules)
    {
        if (sortRules == null || sortRules.Count == 0)
        {
            return data;
        }

        IOrderedEnumerable<Dictionary<string, object?>>? orderedData = null;
        HashSet<string> processedColumns = new(StringComparer.OrdinalIgnoreCase);
        foreach (var rule in sortRules)
        {
            if (string.IsNullOrWhiteSpace(rule.Column) || processedColumns.Contains(rule.Column))
            {
                continue;
            }
            processedColumns.Add(rule.Column);
            Func<Dictionary<string, object?>, object?> keySelector =row => GetColumnValue(row, rule.Column);
            bool isDescending = rule.Order.Equals("desc", StringComparison.OrdinalIgnoreCase);
            if (orderedData == null)
            {
                orderedData = isDescending? data.OrderByDescending(keySelector, Comparer<object?>.Create(CompareValues))
                    : data.OrderBy(keySelector, Comparer<object?>.Create(CompareValues));
            }
            else
            {
                orderedData = isDescending
                    ? orderedData.ThenByDescending(keySelector, Comparer<object?>.Create(CompareValues))
                    : orderedData.ThenBy(keySelector, Comparer<object?>.Create(CompareValues));
            }
        }
        return orderedData?.ToList() ?? data;
    }

    private object? GetColumnValue(Dictionary<string, object?> row, string columnName)
    {
        var key = row.Keys.FirstOrDefault(k => k.Equals(columnName, StringComparison.OrdinalIgnoreCase));

        if (key == null)
        {
            return null;
        }

        var value = row[key];
        if (value == DBNull.Value)
        {
            return null;
        }
        return value;
    }

    private int CompareValues(object? x, object? y)
    {
        if (x == null && y == null) return 0;
        if (x == null) return -1;
        if (y == null) return 1;
        if (x.GetType() == y.GetType() && x is IComparable comparableX)
        {
            return comparableX.CompareTo(y);
        }
        return string.Compare(x.ToString(), y.ToString(), StringComparison.OrdinalIgnoreCase);
    }
}