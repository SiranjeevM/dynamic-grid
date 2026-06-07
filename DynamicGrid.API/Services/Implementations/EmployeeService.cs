using DynamicGrid.API.Models;
using DynamicGrid.API.Repositories.Interfaces;
using DynamicGrid.API.Services.Interfaces;

namespace DynamicGrid.API.Services.Implementation;

public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _repository;

    public EmployeeService(IEmployeeRepository repository)
    {
        _repository = repository;
    }

    public List<Employee> GetEmployees(EmployeeRequest request)
    {
        if (request.PageNumber < 1)
        {
            request.PageNumber = 1;
        }
        if (request.PageSize < 1)
        {
            request.PageSize = 10;
        }
        var validRules =ValidateSortRules(request.SortRules);
        string orderByClause =BuildOrderByClause(validRules);
        int offset =(request.PageNumber - 1)* request.PageSize;
        return _repository.GetEmployees(offset,request.PageSize,orderByClause);
    }


    private List<SortRule> ValidateSortRules(List<SortRule> sortRules)
    {
        List<SortRule> validRules =new List<SortRule>();
        List<string> usedColumns =new List<string>();
        foreach (var rule in sortRules)
        {
            string column =rule.Column.ToLower();
            if (usedColumns.Contains(column))
            {
                continue;
            }

            usedColumns.Add(column);
            validRules.Add(rule);
        }
        return validRules;
    }
    
    private string BuildOrderByClause(List<SortRule> sortRules)
    {
        if (sortRules.Count == 0)
        {
            return "Id ASC";
        }
        string orderBy = "";
        foreach (var rule in sortRules)
        { 
            orderBy +=$"{rule.Column} {rule.Order},"; 
        }
        return orderBy.TrimEnd(',');
        
    }
}