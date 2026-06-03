CREATE DATABASE DynamicGridDB;
GO

USE DynamicGridDB;
GO

CREATE TABLE Employees
(
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(100),
    Department VARCHAR(100),
    Salary DECIMAL(18,2)
);

INSERT INTO Employees
VALUES
('John','IT',50000),
('Arun','HR',30000),
('David','Finance',45000);