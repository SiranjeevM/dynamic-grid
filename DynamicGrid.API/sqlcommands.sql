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

ALTER TABLE Employees
DROP COLUMN Email;

CREATE TABLE Students
(
    StudentId INT PRIMARY KEY,
    StudentName VARCHAR(100),
    Department VARCHAR(50),
    Mark INT
);

CREATE TABLE Airports
(
    AirportCode VARCHAR(10),
    AirportName VARCHAR(100),
    City VARCHAR(100),
    Country VARCHAR(100)
);

INSERT INTO Students VALUES
(1,'Arun','CSE',85),
(2,'John','IT',90),
(3,'David','ECE',78),
(4,'Sarah','CSE',92),
(5,'Michael','IT',88),
(6,'Robert','EEE',75),
(7,'James','ECE',81),
(8,'Emma','CSE',95),
(9,'Sophia','IT',89),
(10,'Daniel','EEE',73),
(11,'Olivia','ECE',84),
(12,'William','CSE',87),
(13,'Liam','IT',91),
(14,'Noah','EEE',79),
(15,'Ava','ECE',93);

INSERT INTO Airports VALUES
('MAA','Chennai International Airport','Chennai','India'),
('DEL','Indira Gandhi International Airport','Delhi','India'),
('BLR','Kempegowda International Airport','Bangalore','India'),
('HYD','Rajiv Gandhi International Airport','Hyderabad','India'),
('COK','Cochin International Airport','Kochi','India'),
('BOM','Chhatrapati Shivaji Airport','Mumbai','India'),
('CCU','Netaji Subhas Chandra Bose Airport','Kolkata','India'),
('TRZ','Tiruchirappalli Airport','Trichy','India'),
('IXM','Madurai Airport','Madurai','India'),
('PNQ','Pune Airport','Pune','India'),
('DXB','Dubai International Airport','Dubai','UAE'),
('LHR','Heathrow Airport','London','UK'),
('JFK','John F. Kennedy Airport','New York','USA'),
('SIN','Changi Airport','Singapore','Singapore'),
('SYD','Sydney Airport','Sydney','Australia');


select * from Employees;
SELECT * FROM Students;
SELECT * FROM Airports;