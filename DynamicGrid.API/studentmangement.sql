CREATE DATABASE StudentAcademicDB;
GO

USE StudentAcademicDB;
GO

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