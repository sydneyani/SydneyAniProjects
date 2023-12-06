CREATE DATABASE HospitalDB;

USE HospitalDB;

SELECT * FROM Allergy;

-- CREATING ENTITIES TABLES

-- Department Table
CREATE TABLE Department (
    DEPT_ID INT PRIMARY KEY,
    DEPT_NAME VARCHAR(255)
);

-- Doctor Table
CREATE TABLE Doctor (
    DOCTOR_ID INT PRIMARY KEY,
    DOCTOR_FNAME VARCHAR(255),
    DOCTOR_LNAME VARCHAR(255),
    APP_ID INT,
    USER_ID INT,
    FOREIGN KEY (APP_ID) REFERENCES Appointment(APP_ID),
    FOREIGN KEY (USER_ID) REFERENCES Users(USER_ID)
);


-- Nurse Table
CREATE TABLE Nurse (
    NURSE_ID INT PRIMARY KEY,
    NURSE_FNAME VARCHAR(255),
    NURSE_LNAME VARCHAR(255),
    DEPT_ID INT,
    DEPT_NAME VARCHAR(255),
    Hours_Worked INT,
    FOREIGN KEY (DEPT_ID) REFERENCES Department(DEPT_ID)
);


ALTER TABLE Appointment
DROP FOREIGN KEY Appointment_ibfk_2;

-- InsurancePolicy Table
CREATE TABLE InsurancePolicy (
    INSPOLICY_ID INT PRIMARY KEY,
    PATIENT_ID INT,
    POLICY_NAME VARCHAR(255),
    COVERAGE_AMOUNT INT,
    POLICY_TYPE VARCHAR(50)
);

-- InsuranceCompany Table
CREATE TABLE InsuranceCompany (
    INSCOMP_ID INT PRIMARY KEY,
    PATIENT_ID INT,
    COMPANY_NAME VARCHAR(255),
    COMPANY_TYPE VARCHAR(50)
);

-- Appointment Table
CREATE TABLE Appointment (
    APP_ID INT PRIMARY KEY,
    DOCTOR_ID INT,
    PATIENT_ID INT,
    APPOINTMENT_DATE DATE,
    APPOINTMENT_TIME TIME,
    FOREIGN KEY (DOCTOR_ID) REFERENCES Doctor(DOCTOR_ID),
    FOREIGN KEY (PATIENT_ID) REFERENCES Patient(PATIENT_ID)
);

ALTER TABLE Doctor
ADD FOREIGN KEY (APP_ID) REFERENCES Appointment(APP_ID);

-- Patient Table
CREATE TABLE Patient (
    PATIENT_ID INT PRIMARY KEY,
    PATIENT_FNAME VARCHAR(255),
    PATIENT_LNAME VARCHAR(255),
    DOB DATE,
    GENDER VARCHAR(50));

-- VideoLog Table
CREATE TABLE VideoLog (
    VIDEO_ID INT PRIMARY KEY,
    VIDEO_NAME VARCHAR(255),
    TELEHEALTH_ID INT,
    VIDEO_DATE DATE,
    DURATION TIME
);

-- Vaccination Table
CREATE TABLE Vaccination (
    VACC_ID INT PRIMARY KEY,
    PATIENT_ID INT,
    VACC_NAME VARCHAR(255),
    DOSE VARCHAR(255)
);

-- Allergy Table
CREATE TABLE Allergy (
    ALLERGY_ID INT PRIMARY KEY,
    ALLERGY_NAME VARCHAR(255),
    PATIENT_ID INT,
    SEVERITY VARCHAR(50),
    MED_ID INT,   -- Add this line
    FOREIGN KEY (PATIENT_ID) REFERENCES Patient(PATIENT_ID),
    FOREIGN KEY (MED_ID) REFERENCES Medication(MED_ID)  -- Add this line
);


-- Waiver Table
CREATE TABLE Waivers (
    WAIVER_ID INT PRIMARY KEY,
    PATIENT_ID INT,
    WAIVER_TYPE VARCHAR(255),
    EXPIRATION_DATE DATE
);

-- EmergencyContact Table
CREATE TABLE EmergencyContact (
    EMERGCONTACT_ID INT PRIMARY KEY,
    PATIENT_ID INT,
    CONTACT_NAME VARCHAR(255),
    RELATIONSHIP VARCHAR(50),
    PHONE VARCHAR(15),
    FOREIGN KEY (PATIENT_ID) References Patient(PATIENT_ID)
);

-- Equipment Table
CREATE TABLE Equipment (
    EQUIP_ID INT PRIMARY KEY,
    INVENTORY_ID INT,
    EQUIP_NAME VARCHAR(255),
    EQUIP_STATUS VARCHAR(50)
);

-- Surgery Table
CREATE TABLE Surgery (
    SURGERY_ID INT PRIMARY KEY,
    EQUIP_ID INT,
    SURGERY_NAME VARCHAR(255),
    SURGERY_DATE DATE,
    PATIENT_ID INT
);


-- MedicalHistory Table
CREATE TABLE MedicalHistory (
    MEDHIST_ID INT PRIMARY KEY,
    PATIENT_ID INT,
    DISEASE_NAME VARCHAR(255),
    DATE_DIAGNOSED DATE
);

-- Bed Table
CREATE TABLE Bed (
    BED_ID INT PRIMARY KEY,
    ROOM_ID INT,
    BED_TYPE VARCHAR(50),
    BED_STATUS VARCHAR(255)
);

-- Room Table
CREATE TABLE Room (
    ROOM_ID INT PRIMARY KEY,
    PATIENT_ID INT,
    ROOM_TYPE VARCHAR(50),
    ROOM_STATUS VARCHAR(50)
);

-- Chartlog Table
CREATE TABLE Chartlog (
    CATALOG_ID INT PRIMARY KEY,
    PATIENT_ID INT,
    DATE_LOGGED DATE,
    NOTES TEXT
);

-- Receptionist Table
CREATE TABLE Receptionist (
    RECEPTION_ID INT PRIMARY KEY,
    RECEPTIONIST_FNAME VARCHAR(255),
    RECEPTIONIST_LNAME VARCHAR(255)
);

-- LabTechnician Table
CREATE TABLE LabTechnician (
    LABTECH_ID INT PRIMARY KEY,
    TECH_FNAME VARCHAR(255),
    TECH_LNAME VARCHAR(255),
    SPECIALIZATION VARCHAR(255),
    Hours_Worked INT,
    Tests_completed INT
);

-- Test Table
CREATE TABLE LabTest (
    TEST_ID INT PRIMARY KEY,
    TEST_NAME VARCHAR(255),
    TEST_DESCRIPTION VARCHAR(50)
);

-- TelehealthSession Table
CREATE TABLE TelehealthSession (
    TELEHEALTH_ID INT PRIMARY KEY,
    PATIENT_ID INT,
    DOCTOR_ID INT,
    SESSION_DATE DATE,
    DURATION VARCHAR(255),
    CHATLOG_ID INT,
    PATIENT_FEEDBACK_RATING DECIMAL(3, 2) NULL
);

-- Prescription Table
CREATE TABLE Prescription (
    PRESCRIPTION_ID INT PRIMARY KEY,
    PHARMACY_NAME VARCHAR(255),
    PATIENT_ID INT,
    DOCTOR_ID INT,
    PRESCRIPTION_DATE DATE
);

-- Medication Table
CREATE TABLE Medication (
    MED_ID INT PRIMARY KEY,
    PHARMACY_ID INT,
    MED_NAME VARCHAR(255),
    MANUFACTURER VARCHAR(50),
    INVENTORY_ID INT,
    FOREIGN KEY (INVENTORY_ID) REFERENCES Inventory(INVENTORY_ID)
);

-- Pharmacy Table
CREATE TABLE Pharmacy (
    PHARMACY_ID INT PRIMARY KEY,
    PHARMACY_NAME VARCHAR(255),
    ADDRESS VARCHAR(255)
);

-- Billing Table
CREATE TABLE Billing (
    BILLING_ID INT PRIMARY KEY,
    PATIENT_ID INT,
    PAYMENT_ID INT,
    BILL_AMOUNT DECIMAL(10, 2),
    BILL_DATE DATE
);

-- Payment Table
CREATE TABLE Payment (
    PAYMENT_ID INT PRIMARY KEY,
    BILLING_ID INT,
    AMOUNT_PAID DECIMAL(10, 2),
    PAYMENT_DATE DATE
);

-- Supplier Table
CREATE TABLE Supplier (
    SUPPLIER_ID INT PRIMARY KEY,
    SUPPLIER_NAME VARCHAR(255),
    ADDRESS VARCHAR(255)
);

-- Inventory Table
CREATE TABLE Inventory (
    INVENTORY_ID INT PRIMARY KEY,
    ITEM_NAME VARCHAR(255),
    SUPPLIER_ID INT,
    QUANTITY INT
);

-- Shipment Table
CREATE TABLE Shipment (
    SHIP_ID INT PRIMARY KEY,
    SHIP_DATE DATE,
    INVENTORY_ID INT,
    SUPPLIER_ID INT,
    RECEIVED_DATE DATE
);

-- Orders Table
CREATE TABLE Orders (
    ORDER_ID INT PRIMARY KEY,
    SUPPLIER_ID INT,
    ORDER_DATE DATE,
    QUANTITY INT,
    INVENTORY_ID INT,
    FOREIGN KEY (SUPPLIER_ID) REFERENCES Supplier(SUPPLIER_ID),
    FOREIGN KEY (INVENTORY_ID) REFERENCES Inventory(INVENTORY_ID)
);

-- DoctorDepartmentRelationship
CREATE TABLE DoctorDepartmentRelationship (
    DOCTORDEPART_ID INT PRIMARY KEY AUTO_INCREMENT,
    DateStarted DATE NOT NULL,
    DateEnded DATE,
    DEPT_ID INT,
    DOCTOR_ID INT,
    FOREIGN KEY (DEPT_ID) REFERENCES Department(DEPT_ID),
    FOREIGN KEY (DOCTOR_ID) REFERENCES Doctor(DOCTOR_ID)
);

-- PatientNurseRelationship
CREATE TABLE PatientNurseRelationship (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    DateStarted DATE NOT NULL,
    DateEnded DATE,
    PATIENT_ID INT,
    NURSE_ID INT,
    FOREIGN KEY (PATIENT_ID) REFERENCES Patient(PATIENT_ID),
    FOREIGN KEY (NURSE_ID) REFERENCES Nurse(NURSE_ID)
);

-- DoctorSurgeryRelationship
CREATE TABLE DoctorSurgeryRelationship (
    DOCTORSURG_ID INT PRIMARY KEY AUTO_INCREMENT,
    DatePerformed DATE NOT NULL,
    DOCTOR_ID INT,
    SURGERY_ID INT,
    FOREIGN KEY (DOCTOR_ID) REFERENCES Doctor(DOCTOR_ID),
    FOREIGN KEY (SURGERY_ID) REFERENCES Surgery(SURGERY_ID)
);

-- PatientDoctorRelationship
CREATE TABLE PatientDoctorRelationship (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    DateStarted DATE NOT NULL,
    DateEnded DATE,
    PATIENT_ID INT,
    DOCTOR_ID INT,
    FOREIGN KEY (PATIENT_ID) REFERENCES Patient(PATIENT_ID),
    FOREIGN KEY (DOCTOR_ID) REFERENCES Doctor(DOCTOR_ID)
);

-- PatientReceptionistRelationship
CREATE TABLE PatientReceptionistRelationship (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    DateStarted DATE NOT NULL,
    DateEnded DATE,
    PATIENT_ID INT,
    RECEPTION_ID INT,
    FOREIGN KEY (PATIENT_ID) REFERENCES Patient(PATIENT_ID),
    FOREIGN KEY (RECEPTION_ID) REFERENCES Receptionist(RECEPTION_ID)
);

-- LabTechnicianRelationship
CREATE TABLE LabTechnicianRelationship (
    TECHLAB_ID INT PRIMARY KEY AUTO_INCREMENT,
    LABTECH_ID INT,
    TEST_ID INT,
    Turnaround_Hours INT,
    FOREIGN KEY (LABTECH_ID) REFERENCES LabTechnician(LABTECH_ID),
    FOREIGN KEY (TEST_ID) REFERENCES LabTest(TEST_ID)
);

-- PrescriptionMedication
CREATE TABLE PrescriptionMedication (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Dosage VARCHAR(255) NOT NULL,
    PRESCRIPTION_ID INT,
    MED_ID INT,
    FOREIGN KEY (PRESCRIPTION_ID) REFERENCES Prescription(PRESCRIPTION_ID),
    FOREIGN KEY (MED_ID) REFERENCES Medication(MED_ID)
);

CREATE TABLE Users (
    USER_ID INT PRIMARY KEY,
    USERNAME VARCHAR(255),
    ROLE VARCHAR(255),
    PERMISSIONS VARCHAR(255)
);

CREATE TABLE AuditTrail (
    AUDIT_ID INT PRIMARY KEY,
    USER_ID INT,
    ACTION_NAME VARCHAR(255),
    TIMESTAMP TIMESTAMP,
    FOREIGN KEY (USER_ID) REFERENCES Users(USER_ID)
);

-- CREATING 10 RECORDS FOR EACH TABLE

-- Populating Department
INSERT INTO Department (DEPT_ID, DEPT_NAME) VALUES 
(1, 'Cardiology'),
(2, 'Neurology'),
(3, 'Dermatology'),
(4, 'Oncology'),
(5, 'Gastroenterology'),
(6, 'Pediatrics'),
(7, 'Orthopedics'),
(8, 'Ophthalmology'),
(9, 'Endocrinology'),
(10, 'Psychiatry');

-- Populating Doctor
INSERT INTO Doctor (DOCTOR_ID, DOCTOR_FNAME, DOCTOR_LNAME, APP_ID, USER_ID) VALUES
(1, 'John', 'Doe', 1, 1),
(2, 'Jane', 'Smith', 2, 2),
(3, 'William', 'Johnson', 3, 3),
(4, 'Emily', 'Davis', 4, 4),
(5, 'Robert', 'Brown', 5, 5),
(6, 'Mary', 'White', 6, 6),
(7, 'David', 'Jones', 7, 7),
(8, 'Angela', 'Clark', 8, 8),
(9, 'Richard', 'Lewis', 2, 9),
(10, 'Susan', 'Green', 5, 10);

-- Populating Nurse
INSERT INTO Nurse (NURSE_ID, NURSE_FNAME, NURSE_LNAME, DEPT_ID, DEPT_NAME, Hours_Worked) VALUES
(1, 'Alice', 'Evans', 1, 'Neurology', 30),
(2, 'Bob', 'Scott', 2, 'Cardiology', 45),
(3, 'Carol', 'Adams', 3, 'Dermatology', 35),
(4, 'Daniel', 'Martin', 4, 'Pediatrics', 40),
(5, 'Elaine', 'Collins', 5,'Psychiatry', 38),
(6, 'Frank', 'Edwards', 6, 'Oncology', 42),
(7, 'Grace', 'Turner', 7, 'Gastroenterology', 50),
(8, 'Harry', 'Hill', 8, 'Endocrinology', 44),
(9, 'Isabelle', 'Thompson', 9, 'Orthopedics', 46),
(10, 'Jack', 'King', 10, 'Opthamology', 48);

-- Modified Populating InsurancePolicy
INSERT INTO InsurancePolicy (INSPOLICY_ID, PATIENT_ID, POLICY_NAME, COVERAGE_AMOUNT, POLICY_TYPE) VALUES
(1, 2, 'Platinum Health Cover', 1000000, 'Premium'),
(2, 4, 'Gold Health Cover', 750000, 'Premium'),
(3, 6, 'Silver Health Cover', 500000, 'Standard'),
(4, 8, 'Bronze Health Cover', 250000, 'Basic'),
(5, 10, 'Basic Health Cover', 100000, 'Basic'),
(6, 1, 'Family Cover', 600000, 'Family'),
(7, 3, 'Senior Citizen Cover', 400000, 'Senior'),
(8, 5, 'Child Cover', 150000, 'Child'),
(9, 7, 'Employee Cover', 800000, 'Employee'),
(10, 9, 'Traveler Health Cover', 200000, 'Travel');

-- Populating InsuranceCompany
INSERT INTO InsuranceCompany (INSCOMP_ID, PATIENT_ID, COMPANY_NAME, COMPANY_TYPE) VALUES
(1, 9, 'HealthGuard Inc.', 'Medicare'),
(2, 5, 'SafeLife Insurances', 'Medicaid'),
(3, 2, 'WellCover Health', 'Medicare'),
(4, 1, 'SecureNow Medicals', 'Medicare'),
(5, 9, 'TopCare Health Providers', 'Dental'),
(6, 7, 'PeaceMind Insurance', 'Mecicare'),
(7, 6, 'SturdyHealth Co.', 'Dental'),
(8, 10, 'MediFirst Providers', 'Medicaid'),
(9, 4, 'WholeLife Medicals', 'Medicare'),
(10, 3, 'FitnWell Insurances', 'Medicare');

-- Populating Appointment
INSERT INTO Appointment (APP_ID, DOCTOR_ID, PATIENT_ID, APPOINTMENT_DATE, APPOINTMENT_TIME) VALUES
(1, 1, 1, DATE_SUB(CURRENT_DATE, INTERVAL 15 DAY), '10:00:00'),
(2, 2, 1, DATE_SUB(CURRENT_DATE, INTERVAL 10 DAY), '11:00:00'),
(3, 3, 2, DATE_SUB(CURRENT_DATE, INTERVAL 5 DAY), '12:00:00'),
(4, 4, 2, DATE_SUB(CURRENT_DATE, INTERVAL 2 DAY), '13:00:00'),
(5, 1, 3, DATE_SUB(CURRENT_DATE, INTERVAL 20 DAY), '14:00:00'),
(6, 2, 4, DATE_SUB(CURRENT_DATE, INTERVAL 1 DAY), '15:00:00'),
(7, 3, 5, DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY), '16:00:00'),
(8, 4, 5, DATE_SUB(CURRENT_DATE, INTERVAL 3 DAY), '09:00:00');
INSERT INTO Appointment (APP_ID, DOCTOR_ID, PATIENT_ID, APPOINTMENT_DATE, APPOINTMENT_TIME) VALUES
(9, 5, 7, DATE_SUB(CURRENT_DATE, INTERVAL 24 DAY), '12:00:00'),
(10, 6, 6, DATE_SUB(CURRENT_DATE, INTERVAL 12 DAY), '13:00:00');


-- Populating Patient
INSERT INTO Patient (PATIENT_ID, PATIENT_FNAME, PATIENT_LNAME, DOB, GENDER) VALUES
(1, 'Alan', 'Walker', '1989-12-01', 'Male'),
(2, 'Beth', 'Taylor', '1992-05-15', 'Female'),
(3, 'Charlie', 'Green', '1985-04-18', 'Male'),
(4, 'Daisy', 'Wilson', '2000-06-20', 'Female'),
(5, 'Eliot', 'James', '1995-02-22', 'Male'),
(6, 'Fiona', 'Smith', '1988-03-30', 'Female'),
(7, 'Gary', 'White', '1980-07-04', 'Male'),
(8, 'Hannah', 'Brown', '1998-08-19', 'Female'),
(9, 'Ian', 'Clark', '1993-09-12', 'Male'),
(10, 'Jenny', 'Lewis', '1990-10-05', 'Female');

-- Populating VideoLog
INSERT INTO VideoLog (VIDEO_ID, VIDEO_NAME, TELEHEALTH_ID, VIDEO_DATE, DURATION) VALUES
(1, 'Video Consultation 1', 1, '2023-10-01', '10:00:00'),
(2, 'Video Consultation 2', 2, '2023-10-02', '11:00:00'),
(3, 'Video Consultation 3', 3, '2023-10-03', '12:00:00'),
(4, 'Video Consultation 4', 4, '2023-10-04', '14:00:00'),
(5, 'Video Consultation 5', 5, '2023-10-05', '15:00:00'),
(6, 'Video Consultation 6', 6, '2023-10-06', '09:00:00'),
(7, 'Video Consultation 7', 7, '2023-10-07', '08:00:00'),
(8, 'Video Consultation 8', 8, '2023-10-08', '16:00:00'),
(9, 'Video Consultation 9', 9, '2023-10-09', '10:30:00'),
(10, 'Video Consultation 10', 10, '2023-10-10', '13:00:00');

-- Populating Vaccination
INSERT INTO Vaccination (VACC_ID, PATIENT_ID, VACC_NAME, DOSE) VALUES
(1, 1, 'COVID-19', 'First'),
(2, 2, 'COVID-19', 'Second'),
(3, 3, 'Measles', 'Single Dose'),
(4, 4, 'Hepatitis B', 'First'),
(5, 5, 'Hepatitis B', 'Second'),
(6, 6, 'Hepatitis B', 'Third'),
(7, 7, 'Chickenpox', 'Single Dose'),
(8, 8, 'Polio', 'First'),
(9, 9, 'Polio', 'Second'),
(10, 10, 'Polio', 'Third');

-- Populating Allergy
INSERT INTO Allergy (ALLERGY_ID, ALLERGY_NAME, PATIENT_ID, SEVERITY, MED_ID) VALUES
(1, 'Paracetamol', 1, 'High', 1),
(2, 'Dairy', 2, 'Medium', NULL),
(3, 'Seafood', 3, 'Low', NULL),
(4, 'Ibuprofen', 4, 'Medium', 2),
(5, 'Wheat', 5, 'Low', NULL),
(6, 'Eggs', 6, 'High', NULL),
(7, 'Nuts', 7, 'Medium', NULL),
(8, 'Bees', 8, 'High', NULL),
(9, 'Latex', 9, 'Medium', NULL),
(10, 'Grass', 10, 'Low', NULL);

-- Populating Waiver
INSERT INTO Waivers (WAIVER_ID, PATIENT_ID, WAIVER_TYPE, EXPIRATION_DATE) VALUES
(1, 5, 'Surgery Consent', '2024-01-01'),
(2, 4, 'Clinical Trial', '2024-02-15'),
(3, 2, 'Data Usage', '2024-05-10'),
(4, 1, 'Medication Side-Effects', '2024-06-20'),
(5, 8, 'Treatment Consent', '2024-04-17'),
(6, 7, 'Medical Data Sharing', '2024-11-03'),
(7, 3, 'Medical Imaging', '2024-09-12'),
(8, 6, 'Blood Donation', '2024-08-24'),
(9, 10, 'Medical Procedure', '2024-07-30'),
(10, 9, 'Emergency Procedure', '2024-03-15');

-- Populating EmergencyContact
INSERT INTO EmergencyContact (EMERGCONTACT_ID, PATIENT_ID, CONTACT_NAME, RELATIONSHIP, PHONE) VALUES
(1, 5, 'Mark Johnson', 'Brother', '123-456-7890'),
(2, 2, 'Emily Clark', 'Wife', '098-765-4321'),
(3, 1, 'Alan Smith', 'Father', '111-222-3333'),
(4, 6, 'Lucy Gray', 'Mother', '444-555-6666'),
(5, 8, 'Tom Green', 'Friend', '777-888-9999'),
(6, 9, 'Daisy Hill', 'Sister', '000-123-4567'),
(7, 4, 'Alex Rose', 'Cousin', '987-654-3210'),
(8, 3, 'Robert Brown', 'Uncle', '246-810-1214'),
(9, 7, 'Stella Pearl', 'Aunt', '135-790-8642'),
(10, 10, 'Jake Blue', 'Neighbor', '512-634-8079');

-- Populating Equipment
INSERT INTO Equipment (EQUIP_ID, INVENTORY_ID, EQUIP_NAME, EQUIP_STATUS) VALUES
(1, 1, 'Ventilator', 'In Use'),
(2, 2, 'ECG Machine', 'Available'),
(3, 3, 'Ultrasound Machine', 'In Use'),
(4, 4, 'MRI Scanner', 'Available'),
(5, 5, 'X-Ray Machine', 'Available'),
(6, 6, 'Blood Pressure Monitor', 'Available'),
(7, 7, 'Pulse Oximeter', 'In Use'),
(8, 8, 'Defibrillator', 'Available'),
(9, 9, 'Surgical Tools Kit', 'In Use'),
(10, 10, 'Stethoscope', 'Available');

-- Populating Surgery
INSERT INTO Surgery (SURGERY_ID, EQUIP_ID, SURGERY_NAME, SURGERY_DATE, PATIENT_ID) VALUES
(1, 9, 'Heart Bypass', DATE_SUB(CURRENT_DATE, INTERVAL 15 DAY), 1),
(2, 4, 'Hip Replacement', DATE_SUB(CURRENT_DATE, INTERVAL 20 DAY), 2),
(3, 9, 'Kidney Transplant', DATE_SUB(CURRENT_DATE, INTERVAL 25 DAY), 3),
(4, 9, 'Cataract Surgery', DATE_SUB(CURRENT_DATE, INTERVAL 5 DAY), 4),
(5, 5, 'Appendectomy', DATE_SUB(CURRENT_DATE, INTERVAL 10 DAY), 5),
(6, 5, 'Tonsillectomy', '2023-12-15', 6),
(7, 9, 'Gallbladder Removal', '2023-12-20', 7),
(8, 8, 'Hernia Repair', '2024-01-01', 8),
(9, 9, 'Spinal Fusion', '2024-01-10', 9),
(10, 3, 'Pregnancy', '2024-01-15', 10),
(11, 9, 'Knee Replacement', DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY), 11),
(12, 9, 'Hip Replacement', DATE_SUB(CURRENT_DATE, INTERVAL 8 DAY), 12),
(13, 9, 'Shoulder Surgery', DATE_SUB(CURRENT_DATE, INTERVAL 9 DAY), 13),
(14, 9, 'Gastric Bypass', DATE_SUB(CURRENT_DATE, INTERVAL 6 DAY), 14),
(15, 9, 'Liver Transplant', DATE_SUB(CURRENT_DATE, INTERVAL 3 DAY), 15),
(16, 5, 'Colonoscopy', DATE_SUB(CURRENT_DATE, INTERVAL 4 DAY), 16),
(17, 5, 'Lumpectomy', DATE_SUB(CURRENT_DATE, INTERVAL 3 DAY), 17);



-- Populating MedicalHistory
INSERT INTO MedicalHistory (MEDHIST_ID, PATIENT_ID, DISEASE_NAME, DATE_DIAGNOSED) VALUES
(1, 2, 'Hypertension', '2018-05-15'),
(2, 4, 'Diabetes', '2019-03-10'),
(3, 6, 'Asthma', '2020-02-01'),
(4, 7, 'Chickenpox', '2015-11-20'),
(5, 8, 'Tuberculosis', '2017-04-17'),
(6, 10, 'Malaria', '2016-08-09'),
(7, 9, 'Dengue', '2019-09-12'),
(8, 1, 'Thyroid', '2020-06-24'),
(9, 3, 'Bronchitis', '2021-07-03'),
(10, 5, 'Arthritis', '2022-01-21');

-- Populating Bed
INSERT INTO Bed (BED_ID, ROOM_ID, BED_TYPE, BED_STATUS) VALUES
(1, 123, 'General', 'Occupied'),
(2, 220, 'General', 'Available'),
(3, 004, 'ICU', 'Occupied'),
(4, 005, 'ICU', 'Available'),
(5, 110,  'Pediatric', 'Occupied'),
(6, 120, 'Pediatric', 'Available'),
(7, 251, 'Maternity', 'Occupied'),
(8, 213, 'Maternity', 'Available'),
(9, 750, 'Surgical', 'Occupied'),
(10, 751, 'Surgical', 'Available');

-- Populating Room
INSERT INTO Room (ROOM_ID, ROOM_TYPE, ROOM_STATUS) VALUES
(1, 'Single', 'Occupied'),
(2, 'Double', 'Available'),
(3, 'ICU', 'Occupied'),
(4, 'Operating', 'Available'),
(5, 'Emergency', 'Occupied'),
(6, 'Maternity', 'Available'),
(7, 'Pediatric', 'Occupied'),
(8, 'Recovery', 'Available'),
(9, 'Isolation', 'Occupied'),
(10, 'Consultation', 'Available');

-- Populating Chartlog
INSERT INTO Chartlog (CATALOG_ID, PATIENT_ID, NOTES, DATE_LOGGED) VALUES
(1, 9, 'Patient vitals stable', '2023-10-25'),
(2, 8, 'Recommended physiotherapy', '2023-10-24'),
(3, 2, 'Administered 5mg Morphine', '2023-10-23'),
(4, 2, 'Patient complained of nausea', '2023-10-22'),
(5, 1, 'Blood test scheduled for tomorrow', '2023-10-21'),
(6, 5, 'X-ray shows possible fracture', '2023-10-20'),
(7, 1, 'Patient resting post-surgery', '2023-10-19'),
(8, 6, 'Started new antibiotic course', '2023-10-18'),
(9, 3, 'Physical examination normal', '2023-10-17'),
(10, 2, 'EKG results consistent with previous', '2023-10-16');

-- Populating Receptionist
INSERT INTO Receptionist (RECEPTION_ID, RECEPTIONIST_FNAME, RECEPTIONIST_LNAME) VALUES
(1, 'Alice', 'Wright'),
(2, 'Bob', 'Thompson'),
(3, 'Chloe', 'Martin'),
(4, 'David', 'Johnson'),
(5, 'Ella', 'Lewis'),
(6, 'Frank', 'White'),
(7, 'Grace', 'Hall'),
(8, 'Henry', 'Jackson'),
(9, 'Isla', 'Wilson'),
(10, 'Jack', 'Davis');

-- Populating LabTechnician
INSERT INTO LabTechnician (LABTECH_ID, TECH_FNAME, TECH_LNAME, SPECIALIZATION, Tests_completed) VALUES
(1, 'Lucas', 'Patterson', 'Blood Tests', 25),
(2, 'Mia', 'Turner', 'Microbiology', 18),
(3, 'Noah', 'Campbell', 'Histopathology', 15),
(4, 'Olivia', 'Moore', 'Cytology', 10),
(5, 'Parker', 'Harris', 'Genetics', 5),
(6, 'Quinn', 'Scott', 'Immunology', 12),
(7, 'Riley', 'Evans', 'Hematology', 20),
(8, 'Sophia', 'Adams', 'Biochemistry', 8),
(9, 'Tyler', 'Phillips', 'Molecular Pathology', 7),
(10, 'Zoe', 'Clark', 'Serology', 22);


-- Populating Test
INSERT INTO LabTest (TEST_ID, TEST_NAME, TEST_DESCRIPTION) VALUES
(1, 'Blood Test', 'Complete Blood Count'),
(2, 'Urine Test', 'Urine Analysis'),
(3, 'Liver Function', 'Monitor liver performance'),
(4, 'Kidney Function', 'Assess how well kidneys are working'),
(5, 'Blood Sugar', 'Check for diabetes'),
(6, 'Thyroid Test', 'Check thyroid function'),
(7, 'HIV Test', 'Test for HIV/AIDS'),
(8, 'Cholesterol Test', 'Measure level of cholesterol'),
(9, 'Pregnancy Test', 'Check for pregnancy'),
(10, 'COVID-19 Test', 'Determine presence of COVID-19 virus');

-- Populating TelehealthSession
INSERT INTO TelehealthSession (TELEHEALTH_ID, SESSION_DATE, DURATION, PATIENT_ID, DOCTOR_ID, CHATLOG_ID, PATIENT_FEEDBACK_RATING) VALUES
(1, '2023-10-24', '3:00 pm', 1, 1, 1001, 5.0),
(2, '2023-10-24', '4:00 pm', 2, 1, 1002, 5.0),
(3, '2023-10-23', '12:00 pm', 3, 1 ,1003, 4.7),
(4, '2023-10-22', '11:00 am', 4, 9, 1004, 4.8),
(5, '2023-10-21', '6:00 am', 5, 6, 1005, 4.5),
(6, '2023-10-20', '3:00 pm', 6, 7, 1006, 2.1),
(7, '2023-10-19', '5:00 am', 7, 2, 1007, 5.0),
(8, '2023-10-18', '2:00 pm', 8, 4, 1008, 5.0),
(9, '2023-10-17', '4:00 pm', 9, 2, 1009, 3.0),
(10, '2023-10-16', '10:00 am', 10, 3, 1010, 4.1),
(11, '2023-10-25', '3:00 pm', 11, 5, 1011, 4.5),
(12, '2023-10-26', '4:00 pm', 12, 2, 1012, 4.0),
(13, '2023-10-27', '12:00 pm', 13, 5, 1013, 3.5),
(14, '2023-10-28', '11:00 am', 14, 5, 1014, 4.5),
(15, '2023-10-29', '6:00 am', 15, 5, 1015, 4.0),
(16, '2023-10-30', '3:00 pm', 16, 6, 1016, 3.0), 
(17, '2023-10-31', '5:00 am', 17, 6, 1017, 3.5), 
(18, '2023-11-01', '2:00 pm', 18, 2, 1018, 3.0),
(19, '2023-11-02', '4:00 pm', 19, 6, 1019, 3.5),
(20, '2023-11-03', '4:00 pm', 19, 6, 1019, 3.5),
(21, '2023-11-04', '4:00 pm', 19, 6, 1019, 3.5),
(22, '2023-11-05', '4:00 pm', 19, 6, 1019, 3.5),
(23, '2023-11-06', '4:00 pm', 19, 6, 1019, 3.5),
(24, '2023-11-07', '4:00 pm', 19, 6, 1019, 3.5),
(25, '2023-11-08', '4:00 pm', 19, 6, 1019, 3.5),
(26, '2023-11-09', '4:00 pm', 19, 6, 1019, 3.0),
(27, '2023-11-010', '10:00 am', 20, 2, 1020, 4.5);


-- Populating Prescription
INSERT INTO Prescription (PRESCRIPTION_ID, PHARMACY_NAME, PRESCRIPTION_DATE, PATIENT_ID, DOCTOR_ID) VALUES
(1, 'Kroger', '2023-10-24', 1, 1),
(2, 'CVS', '2023-10-23', 2, 2),
(3, 'Walgreens', '2023-10-22', 3, 1),
(4, 'Walmart', '2023-10-21', 4, 3),
(5, 'Kroger', '2023-10-20', 5, 2),
(6, 'Kroger', '2023-10-19', 6, 1),
(7, 'CVS', '2023-10-18', 7, 3),
(8, 'Walgreens', '2023-10-17', 8, 2),
(9, 'CVS', '2023-10-16', 9, 1),
(10, 'Walgreens', '2023-10-15', 10, 2);

-- Populating Medication
INSERT INTO Medication (MED_ID, MED_NAME, MANUFACTURER, PHARMACY_ID, INVENTORY_ID) VALUES
(1, 'Paracetamol', 'PharmaCo', 1, 11),
(2, 'Ibuprofen', 'MediMakers', 2, 12),
(3, 'Aspirin', 'PharmaCo', 3, 13),
(4, 'Metformin', 'LifeMed', 4, 14),
(5, 'Atorvastatin', 'MediMakers', 1, 15),
(6, 'Amlodipine', 'LifeMed', 2, 16),
(7, 'Losartan', 'PharmaCo', 3, 17),
(8, 'Hydrochlorothiazide', 'LifeMed', 4, 18),
(9, 'Gabapentin', 'PharmaCo', 1, 19),
(10, 'Amoxicillin', 'MediMakers', 2, 20);


-- Populating Pharmacy
INSERT INTO Pharmacy (PHARMACY_ID, PHARMACY_NAME, ADDRESS) VALUES
(1, 'CVS', '123 Health St.'),
(2, 'Walmart', '456 Pharma Ln.'),
(3, 'Walgreens', '789 Cure Blvd.'),
(4, 'Kroger', '101 Pill Pl.'),
(5, 'MediMakers Dispensary', '111 Life Rd.'),
(6, 'PharmaCo Drugstore', '121 Well St.'),
(7, 'HealthyChoice Pharmacy', '131 Recovery Rd.'),
(8, 'PillMakers Chemists', '141 Drug Dr.'),
(9, 'CureWell Drugstore', '151 Wellness Way'),
(10, 'Prescribers Pharmacy', '161 Health Heights');

-- Populating Billing
INSERT INTO Billing (BILLING_ID, BILL_AMOUNT, PAYMENT_ID, BILL_DATE, PATIENT_ID) VALUES
(1, 100.50, 1, '2023-10-24', 1),
(2, 1025000.00, 2, '2023-10-23', 2),
(3, 150.00, 3, '2023-10-22', 3),
(4, 755000.00, 4, '2023-10-21', 4),
(5, 200.00, 5, '2023-10-20', 5),
(6, 125.25, 6, '2023-10-19', 6),
(7, 80.00, 7, '2023-10-18', 7),
(8, 90.50, 8, '2023-10-17', 8),
(9, 110.75, 9, '2023-10-16', 9),
(10, 105000, 10, '2023-10-15', 10);

-- Populating Payment
INSERT INTO Payment (PAYMENT_ID, AMOUNT_PAID, PAYMENT_DATE, BILLING_ID) VALUES
(1, 100.50, '2023-10-24', 1),
(2, 1000000.00, '2023-10-24', 2),
(3, 150.00, '2023-10-23', 3),
(4, 750000.00, '2023-10-22', 4),
(5, 200.00, '2023-10-21', 5),
(6, 125.25, '2023-10-20', 6),
(7, 80.00, '2023-10-19', 7),
(8, 90.50, '2023-10-19', 8),
(9, 110.75, '2023-10-18', 9),
(10, 100000.00, '2023-10-18', 10);

-- Populating Supplier
INSERT INTO Supplier (SUPPLIER_ID, SUPPLIER_NAME, ADDRESS) VALUES
(1, 'EquipMakers Ltd.', '123 Supply St.'),
(2, 'MedSupply Inc.', '456 Warehouse Ln.'),
(3, 'WellEquip Co.', '789 Industrial Blvd.'),
(4, 'HealthGear Ltd.', '101 Equipment Pl.'),
(5, 'SupplyMed Inc.', '111 Warehouse Rd.'),
(6, 'GearMed Co.', '121 Supply St.'),
(7, 'EquipWell Ltd.', '131 Industrial Rd.'),
(8, 'SupplyWell Inc.', '141 Warehouse Dr.'),
(9, 'MedGear Co.', '151 Supply Way'),
(10, 'WellnessEquip Ltd.', '161 Industrial Heights');

-- Populating Inventory
INSERT INTO Inventory (INVENTORY_ID, ITEM_NAME, QUANTITY, SUPPLIER_ID) VALUES
(1, 'Sterile Gloves', 100, 1),
(2, 'Surgical Masks', 500, 2),
(3, 'Syringes', 300, 3),
(4, 'Stethoscopes', 50, 4),
(5, 'Thermometers', 75, 5),
(6, 'Blood Pressure Monitors', 40, 6),
(7, 'First Aid Kits', 60, 7),
(8, 'Wheelchairs', 20, 8),
(9, 'IV Drip Stands', 30, 9),
(10, 'Surgical Gowns', 100, 10),
(11, 'Paracetamol', 100, 1),
(12, 'Ibuprofen', 200, 2),
(13, 'Aspirin', 300, 3),
(14, 'Metformin', 400, 4),
(15, 'Atorvastatin', 100, 1),
(16, 'Amlodipine', 200, 2),
(17, 'Losartan', 5, 3),            
(18, 'Hydrochlorothiazide', 8, 4), 
(19, 'Gabapentin', 3, 1),         
(20, 'Amoxicillin', 200, 2);

-- Populating Shipment
INSERT INTO Shipment (SHIP_ID, SHIP_DATE, SUPPLIER_ID, INVENTORY_ID, RECEIVED_DATE) VALUES
(1, '2023-10-24', 1, 1, '2023-10-30'),
(2, '2023-10-23', 2, 2, '2023-10-28'),
(3, '2023-10-22', 3, 3, '2023-10-26'),
(4, '2023-10-21', 4, 4, '2023-10-27'),
(5, '2023-10-20', 5, 5, '2023-10-25'),
(6, '2023-10-19', 6, 6, '2023-10-21'),
(7, '2023-10-18', 7, 7, '2023-10-26'),
(8, '2023-10-17', 8, 8, '2023-10-22'),
(9, '2023-10-16', 9, 9, '2023-10-24'),
(10, '2023-10-15', 10, 10,'2023-10-16');

-- Populating Order
INSERT INTO Orders (ORDER_ID, ORDER_DATE, QUANTITY, SUPPLIER_ID, INVENTORY_ID) VALUES
(1, '2023-10-14', 100, 1, 11),
(2, '2023-10-13', 500, 2, 12),
(3, '2023-10-12', 300, 3, 13),
(4, '2023-10-11', 50, 4, 14),
(5, '2023-10-10', 75, 5, 15),
(6, '2023-10-09', 40, 6, 16),
(7, '2023-10-08', 60, 7, 20),
(8, '2023-10-07', 20, 8, 1),
(9, '2023-10-06', 30, 9, 2),
(10, '2023-10-05', 100, 10, 3);

-- Insert data into DoctorDepartmentRelationship
INSERT INTO DoctorDepartmentRelationship (DOCTORDEPART_ID, DateStarted, DateEnded, DEPT_ID, DOCTOR_ID) VALUES 
(1, '2023-01-01', '2023-05-06', 1, 1),
(2, '2023-01-02', '2023-06-02', 1, 2),
(3, '2022-01-03', '2023-01-03', 2, 3),
(4, '2023-01-04', '2023-01-04', 5, 6),
(5, '2023-01-05', '2023-01-05', 6, 5),
(6, '2023-05-07', '2024-01-06', 2, 1),
(7, '2023-06-03', '2024-01-07', 6, 2),
(8, '2023-01-10', '2024-01-10', 2, 3),
(9, '2023-01-11', '2023-01-11', 7, 8),
(10, '2023-01-12', '2023-01-12', 10, 7);


-- Insert data into PatientNurseRelationship
INSERT INTO PatientNurseRelationship (DateStarted, DateEnded, PATIENT_ID, NURSE_ID) VALUES 
('2023-01-01', '2023-10-22', 1, 1),
('2023-01-02', '2023-10-23', 2, 2),
('2023-01-03', '2023-10-25', 3, 4),
('2023-02-02', '2023-10-27', 4, 2),
('2023-02-12', '2023-10-29', 5, 5),
('2023-02-16', '2023-10-30', 6, 1),
('2023-03-15', '2023-10-31', 7, 2),
('2023-03-26', '2023-11-02', 8, 5),
('2023-03-28', '2023-10-06', 9, 3),
('2023-05-08', '2023-10-10', 10, 3);

-- Insert data into DoctorSurgeryRelationship
INSERT INTO DoctorSurgeryRelationship (DOCTORSURG_ID, DatePerformed, DOCTOR_ID, SURGERY_ID) VALUES 
(1, '2023-01-01', 1, 1),
(2, '2023-01-16', 1, 2),
(3, '2023-01-18', 2, 4),
(4, '2023-01-20', 4, 4),
(5, '2023-01-24', 3, 3),
(6, '2023-01-26', 3, 2),
(7, '2023-01-28', 2, 3),
(8, '2023-01-30', 2, 1),
(9, '2023-02-06', 1, 3),
(10, '2023-02-10', 1, 2);


-- Insert data into PatientDoctorRelationship
INSERT INTO PatientDoctorRelationship (DateStarted, DateEnded, PATIENT_ID, DOCTOR_ID) VALUES 
('2023-09-01', '2023-10-02', 1, 1),
('2023-09-02', '2023-10-06', 2, 3),
('2023-09-16', '2023-10-17', 2, 4),
('2023-09-12', '2023-10-20', 1, 2),
('2023-09-09', '2023-10-11', 6, 1),
('2023-09-16', '2023-10-16', 4, 1),
('2023-09-25', '2023-10-28', 5, 2),
('2023-09-22', '2023-10-22', 6, 4),
('2023-09-26', '2023-10-26', 9, 3),
('2023-09-12', '2023-10-30', 3, 2);

-- Insert data into PatientReceptionistRelationship
INSERT INTO PatientReceptionistRelationship (DateStarted, DateEnded, PATIENT_ID, RECEPTION_ID) VALUES 
('2023-01-01', '2023-10-25', 1, 1),
('2023-01-02', '2023-10-26', 2, 2),
('2023-01-02', '2023-02-12', 3, 1),
('2023-01-02', '2023-08-15', 4, 1),
('2023-01-02', '2023-07-17', 5, 1),
('2023-01-02', '2023-04-26', 6, 2),
('2023-01-02', '2023-07-26', 7, 1),
('2023-01-02', '2023-05-26', 8, 2),
('2023-01-02', '2023-2-26', 9, 2),
('2023-01-02', '2023-01-26', 10, 2);


-- Insert data into LabTechnicianCertificateRelationship
INSERT INTO LabTechnicianRelationship (TECHLAB_ID, LABTECH_ID, TEST_ID, Turnaround_Hours) VALUES 
(1, 1, 1, 50),
(2, 1, 2, 50),
(3, 1, 1, 50),
(4, 1, 3, 50),
(5, 1, 4, 50),
(6, 1, 5, 50),
(7, 1, 6, 50),
(8, 1, 7, 50),
(9, 1, 8, 50),
(10, 1, 9, 50),
(11, 1, 10, 50),
(12, 1, 1, 50),
(13, 1, 2, 50),
(14, 1, 3, 50),
(15, 1, 4, 50);


-- Insert data into PrescriptionMedication
INSERT INTO PrescriptionMedication (Dosage, PRESCRIPTION_ID, MED_ID) VALUES 
('2 tablets daily', 1, 1),  -- Patient 1 is prescribed Paracetamol, which they are allergic to
('1 tablet daily', 1, 2),
('5 tablet daily', 4, 1),
('2 tablet daily', 2, 2),  -- Patient 4 is prescribed Ibuprofen, which they are allergic to
('2 tablet daily', 3, 2),
('1 tablet daily', 1, 1),
('0.5 tablet daily', 1, 1),
('2 tablet daily', 2, 1),
('4 tablet daily', 1, 1),
('3 tablet daily', 1, 2);

-- Populating Users table
INSERT INTO Users (USER_ID, USERNAME, ROLE, PERMISSIONS) VALUES
(1, 'Ali', 'Nurse', 'Create,Read,Update,Delete'),
(2, 'Bo', 'Nurse', 'Read,Update'),
(3, 'Carl', 'Receptionist', 'Read'),
(4, 'Dave', 'Doctor', 'Create,Read,Update'),
(5, 'Jo', 'Doctor', 'Read,Update,Delete'),
(6, 'Will', 'Nurse', 'Read,Update,Delete'),
(7, 'Em', 'Receptionist', 'Read'),
(8, 'Rob', 'Nurse', 'Read,Update,Delete'),
(9, 'Mar', 'Doctor', 'Read,Update'),
(10, 'Jan', 'Manager', 'Read,Update,Delete'),
(11, 'Alice', 'Nurse', 'Create,Read,Update,Delete'),
(12, 'Bob', 'Nurse', 'Read,Update'),
(13, 'Charlie', 'Receptionist', 'Read'),
(14, 'David', 'Doctor', 'Create,Read,Update'),
(15, 'John', 'Doctor', 'Read,Update,Delete'),
(16, 'William', 'Nurse', 'Read,Update,Delete'),
(17, 'Emily', 'Receptionist', 'Read'),
(18, 'Robert', 'Nurse', 'Read,Update,Delete'),
(19, 'Mary', 'Doctor', 'Read,Update'),
(20, 'Jane', 'Manager', 'Read,Update,Delete');


-- Populating AuditTrail table
INSERT INTO AuditTrail (AUDIT_ID, USER_ID, ACTION_NAME, TIMESTAMP) VALUES
(1, 11, 'Read', '2023-10-10 10:10:10'),
(2, 12, 'Update', '2023-10-10 10:10:10'),
(3, 12, 'Delete', '2023-10-10 10:10:10'), -- Anomaly
(4, 13, 'Read', '2023-10-10 10:10:10'),
(5, 14, 'Create', '2023-10-10 10:10:10'),
(6, 14, 'Delete', '2023-10-10 10:10:10'), -- Anomaly
(7, 15, 'Delete', '2023-10-10 10:10:10'),
(8, 12, 'Update', '2023-10-12 10:40:23'),
(9, 13, 'Delete', '2023-10-15 12:32:53'), -- Anomaly
(100, 12, 'Read', '2023-10-24 1:52:23');


-- Query Problems 

-- 1

SELECT 
CONCAT(p.PATIENT_FNAME, ' ', p.PATIENT_LNAME) AS PatientFullName,
GROUP_CONCAT(d.DOCTOR_FNAME,' ', d.DOCTOR_LNAME) AS DoctorNames, COUNT(a.APP_ID) AS AppointmentCount
FROM Appointment a
JOIN Patient p ON a.PATIENT_ID = p.PATIENT_ID
JOIN Doctor d ON a.DOCTOR_ID = d.DOCTOR_ID
WHERE a.APPOINTMENT_DATE >= DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH) -- appointments in the past month
GROUP BY p.PATIENT_ID, p.PATIENT_FNAME, p.PATIENT_LNAME
HAVING COUNT(DISTINCT a.DOCTOR_ID) > 1; -- more than one doctor


-- 2

SELECT e.EQUIP_NAME, COUNT(s.SURGERY_ID) as TimesUsed
FROM Surgery s
JOIN Equipment e ON s.EQUIP_ID = e.EQUIP_ID
WHERE YEAR(s.SURGERY_DATE) = YEAR(CURRENT_DATE) -- surgeries this year
GROUP BY s.EQUIP_ID, e.EQUIP_NAME
HAVING TimesUsed > 5;  -- used more than five times


-- 3


SELECT DISTINCT 
  b.PATIENT_ID,
  i.POLICY_NAME AS InsurancePolicy,
  b.BILL_AMOUNT, -- Bill amount before insurance coverage
  i.COVERAGE_AMOUNT AS AmountCoveredByInsurance,
  b.BILL_AMOUNT - i.COVERAGE_AMOUNT AS OutOfPocketPayment -- Out-of-pocket payment before any payments made
FROM Billing b
JOIN InsurancePolicy i ON b.PATIENT_ID = i.PATIENT_ID
WHERE b.BILL_DATE >= '2022-11-04' AND b.BILL_DATE <= '2023-11-04' -- within the last year
AND (b.BILL_AMOUNT - COALESCE((SELECT SUM(p.AMOUNT_PAID) FROM Payment p WHERE p.BILLING_ID = b.BILLING_ID), 0)) > 500;


-- 4

SELECT 
d.DOCTOR_ID,
       d.DOCTOR_FNAME  AS DoctorName,
       COUNT(s.SURGERY_ID) AS SurgeryCount
FROM Doctor d
JOIN Surgery s ON d.DOCTOR_ID = d.DOCTOR_ID
WHERE 
	MONTH(s.SURGERY_DATE) = 10 
GROUP BY
	d.DOCTOR_ID, DoctorName
HAVING
	SurgeryCount > 1;

-- 5

SELECT M.MED_NAME, I.QUANTITY
FROM Medication M
JOIN Inventory I ON M.INVENTORY_ID = I.INVENTORY_ID
LEFT JOIN Orders O ON I.INVENTORY_ID = O.INVENTORY_ID
WHERE I.QUANTITY < 10 AND O.ORDER_ID IS NULL;


-- 6

SELECT 
    DOCTOR_ID, 
    GROUP_CONCAT(DISTINCT DEPT_ID ORDER BY DEPT_ID) AS Departments,
    GROUP_CONCAT(DISTINCT CASE 
        WHEN DateStarted BETWEEN CURDATE() - INTERVAL 6 MONTH AND CURDATE() THEN DateStarted 
        ELSE NULL 
    END ORDER BY DateStarted) AS Last6Months
FROM 
    DoctorDepartmentRelationship
WHERE 
    (DateEnded >= CURDATE() - INTERVAL 6 MONTH OR DateEnded IS NULL)
    AND DateStarted <= CURDATE()
GROUP BY 
    DOCTOR_ID
HAVING 
    COUNT(DISTINCT DEPT_ID) > 1;
    
    
-- 7

SELECT 
    mh.PATIENT_ID, 
    mh.DISEASE_NAME, 
    mh.DATE_DIAGNOSED,
    m.med_name
FROM MedicalHistory mh
JOIN Allergy a ON mh.PATIENT_ID = a.PATIENT_ID
JOIN Medication m ON a.MED_ID = m.MED_ID
JOIN PrescriptionMedication pm ON m.MED_ID = pm.MED_ID
JOIN Prescription p ON pm.PRESCRIPTION_ID = p.PRESCRIPTION_ID AND p.PATIENT_ID = mh.PATIENT_ID
WHERE a.SEVERITY IN ('High', 'Medium')
GROUP BY mh.PATIENT_ID, mh.DISEASE_NAME, mh.DATE_DIAGNOSED, m.med_name;



-- 8

SELECT 
  CONCAT(p.PATIENT_FNAME, ' ', p.PATIENT_LNAME) AS PatientName,
  b.BILL_AMOUNT, 
  pa.AMOUNT_PAID AS PAY_AMOUNT,
  (b.BILL_AMOUNT - pa.AMOUNT_PAID) AS REMAINING
FROM Billing b
JOIN Payment pa ON b.BILLING_ID = pa.BILLING_ID
JOIN Patient p ON b.PATIENT_ID = p.PATIENT_ID
WHERE b.BILL_AMOUNT <> pa.AMOUNT_PAID;


-- 9


-- Query to find nurses who have assisted in surgeries and have worked more than 40 hours
SELECT 
  CONCAT(NURSE_FNAME, ' ', NURSE_LNAME) AS NurseName,
  Hours_Worked,
  DEPT_NAME,
  'Yes' AS AssistedInSurgery
FROM Nurse
WHERE DEPT_NAME IN ('Cardiology', 'Orthopedics', 'Gastroenterology') -- Add other departments as needed
  AND Hours_Worked > 40;


-- 10


SELECT lt.LABTECH_ID, CONCAT( lt.TECH_FNAME, ' ', lt.TECH_LNAME) AS LabTechName,
lt.Tests_completed, AVG(ltr.Turnaround_Hours) AS Avg_Turnaround_Time
FROM LabTechnician lt
JOIN LabTechnicianRelationship ltr ON lt.LABTECH_ID = ltr.LABTECH_ID
GROUP BY lt.LABTECH_ID, lt.TECH_FNAME, lt.TECH_LNAME, lt.Tests_completed
HAVING lt.Tests_completed > 20 AND Avg_Turnaround_Time > 48;


-- 11

SELECT 
  s.PATIENT_ID,
  MAX(s.SURGERY_DATE) AS LastSurgeryDate, -- This will show the most recent surgery date in the past month
  'No' AS FutureAppointment -- Static column indicating 'NO' for future appointments
FROM Surgery s
LEFT JOIN Appointment a ON s.PATIENT_ID = a.PATIENT_ID AND a.APPOINTMENT_DATE > CURRENT_DATE
WHERE s.SURGERY_DATE BETWEEN DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH) AND CURRENT_DATE
AND a.APP_ID IS NULL
GROUP BY s.PATIENT_ID;


-- 12

SELECT a.AUDIT_ID, u.USER_ID, u.USERNAME, u.ROLE, a.ACTION_NAME, a.TIMESTAMP
FROM AuditTrail a
JOIN Users u ON a.USER_ID = u.USER_ID
WHERE NOT FIND_IN_SET(a.ACTION_NAME, u.PERMISSIONS)
AND a.TIMESTAMP > DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY);





SELECT 
d.DOCTOR_ID, 
	CONCAT(d.DOCTOR_FNAME) as DoctorName,
	COUNT(s.SURGERY_ID) as SurgeryCount
FROM Surgery s, DoctorSurgeryRelationship dr
JOIN 
	Doctor d On d.DOCTOR_ID = dr.DOCTOR_ID
WHERE 
YEAR(s.SURGERY_DATE) = YEAR(CURRENT_DATE) -- surgeries this year
GROUP BY d.DOCTOR_ID, d.DOCTOR_FNAME
HAVING SurgeryCount > 1;  -- used more than five times



