-- Create the patients table
CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,             -- Unique identifier for each patient
    patient_name VARCHAR(100) NOT NULL,        -- Patient's name
    patient_dob DATE NOT NULL,                 -- Patient's date of birth
    patient_condition TEXT NOT NULL,           -- Medical condition in free text
    patient_next_app TIMESTAMP                 -- Date of the next appointment
);

-- Insert test data
INSERT INTO patients (
  patient_name,
  patient_dob,
  patient_condition,
  patient_next_app
) VALUES (
  'Matti Meikäläinen',
  '1992-10-10',
  'Perusterve',
  '2025-02-03 10:00:00'
  );

INSERT INTO patients (
  patient_name,
  patient_dob,
  patient_condition,
  patient_next_app
) VALUES (
  'Maija Mehiläinen',
  '1956-09-12',
  'Dementia',
  '2025-01-23 16:30:00'
);