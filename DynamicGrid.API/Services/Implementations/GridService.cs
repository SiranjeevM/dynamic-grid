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

        var data = _repository.GetAllData(request.TableName);
        data = ApplySorting(data, request.SortRules);

        int skip = (request.PageNumber - 1) * request.PageSize;
        return data.Skip(skip).Take(request.PageSize).ToList();
    }

    private List<Dictionary<string, object?>> ApplySorting(List<Dictionary<string, object?>> data, List<SortRule> sortRules)
    {
        if (sortRules == null || sortRules.Count == 0)
        {
            return data;
        }

        IOrderedEnumerable<Dictionary<string, object?>>? sortedData = null;

        foreach (var rule in sortRules)
        {
            if (string.IsNullOrWhiteSpace(rule.Column))
            {
                continue;
            }

            if (sortedData == null)
            {
                sortedData =
                    rule.Order.ToUpper() == "DESC"
                    ? data.OrderByDescending(x => x[rule.Column])
                    : data.OrderBy(x => x[rule.Column]);
            }
            else
            {
                sortedData =
                    rule.Order.ToUpper() == "DESC"
                    ? sortedData.ThenByDescending(x => x[rule.Column])
                    : sortedData.ThenBy(x => x[rule.Column]);
            }
        }

        return sortedData?.ToList() ?? data;
    }
    public List<StudentTreeNode> GetStudentTree()
    {
        var students = _repository.GetAllData("Students");

        var result = new List<StudentTreeNode>();

        var departments = students
            .GroupBy(x => x["Department"]?.ToString());

        foreach (var dept in departments)
        {
            var deptNode = new StudentTreeNode
            {
                Id = result.Count + 1,
                Label = dept.Key ?? ""
            };

            var years = dept.GroupBy(x => x["Year"]?.ToString());

            foreach (var year in years)
            {
                var yearNode = new StudentTreeNode
                {
                    Id = deptNode.Children.Count + 1,
                    Label = "Year " + year.Key
                };

                foreach (var student in year)
                {
                    yearNode.Children.Add(
                        new StudentTreeNode
                        {
                            Id = Convert.ToInt32(student["StudentId"]),
                            Label = student["StudentName"]?.ToString() ?? ""
                        });
                }

                deptNode.Children.Add(yearNode);
            }

            result.Add(deptNode);
        }

        return result;
    }
}
