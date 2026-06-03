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

INSERT INTO Employees
VALUES
('Michael', 'IT', 55000),
('Sarah', 'HR', 35000),
('Robert', 'Finance', 48000),
('Priya', 'IT', 60000),
('Karthik', 'Marketing', 42000),
('Jennifer', 'HR', 37000),
('Daniel', 'Finance', 51000),
('Ravi', 'IT', 58000),
('Anjali', 'Marketing', 40000),
('Thomas', 'Operations', 47000),
('Meena', 'HR', 39000),
('James', 'Finance', 53000),
('Suresh', 'IT', 62000),
('Kavya', 'Marketing', 45000),
('William', 'Operations', 50000);
