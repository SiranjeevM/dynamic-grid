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

DROP TABLE Students
-----------------------------------------------------------------------
CREATE TABLE Students
(
    StudentId INT IDENTITY(1,1) PRIMARY KEY,

    RollNumber VARCHAR(20) NOT NULL,

    StudentName VARCHAR(100) NOT NULL,

    Department VARCHAR(50) NOT NULL,

    Year INT NOT NULL,

    Section VARCHAR(10) NOT NULL,

    CGPA DECIMAL(3,2) NOT NULL,

    Attendance INT NOT NULL,

    Gender VARCHAR(10) NOT NULL,

    Status VARCHAR(20) NOT NULL
);

INSERT INTO Students
(
    RollNumber,
    StudentName,
    Department,
    Year,
    Section,
    CGPA,
    Attendance,
    Gender,
    Status
)
VALUES
('CSE001','Arun Kumar','CSE',3,'A',8.75,92,'Male','Active'),
('CSE002','Priya Sharma','CSE',3,'A',9.10,95,'Female','Active'),
('ECE001','Rahul Raj','ECE',2,'B',7.80,85,'Male','Active'),
('EEE001','Sneha R','EEE',4,'A',8.25,88,'Female','Active'),
('MECH001','Vijay Kumar','MECH',1,'C',7.50,78,'Male','Active'),
('CSE003','Anjali Devi','CSE',2,'B',8.90,96,'Female','Active'),
('ECE002','Karthik S','ECE',3,'A',7.95,82,'Male','Active'),
('CSE004','Nisha P','CSE',4,'A',9.20,98,'Female','Active'),
('IT001','Ajay Kumar','IT',3,'B',8.40,90,'Male','Active'),
('IT002','Deepika M','IT',2,'A',8.70,91,'Female','Active'),
('CSE005','Sanjay R','CSE',1,'C',7.20,75,'Male','Active'),
('ECE003','Harini S','ECE',4,'A',8.60,89,'Female','Active'),
('MECH002','Prakash V','MECH',3,'B',7.85,80,'Male','Active'),
('EEE002','Divya K','EEE',2,'C',8.10,87,'Female','Active'),
('CSE006','Rohit P','CSE',4,'A',9.45,99,'Male','Active');

SELECT * FROM Students;