namespace DynamicGrid.API.Models;

public class GridRequest
{
    public string TableName { get; set; }= string.Empty;

    public int PageNumber { get; set; }

    public int PageSize { get; set; }

    public List<SortRule> SortRules{get;set;}= new();
}