namespace DynamicGrid.API.Models;

public class EmployeeRequest

{
    public string TableName{get;set;}= "Employees";
    public int PageNumber { get; set; }

    public int PageSize { get; set; }

    public List<SortRule> SortRules { get; set; }=new();
}