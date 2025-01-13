import { Patient } from "../types/patient";
import { NotFoundError } from "../types/error";
import { query } from "./db";
import { mapDBPatientToPatient } from "../utils/mappers";

export async function getPatients(): Promise<Patient[]> {
  const patients = await query("SELECT * FROM patients");
  return patients.map(mapDBPatientToPatient);
}

// @TODO sanitize input
export async function getPatient(id: string): Promise<Patient> {
  const patient = (
    await query("SELECT * FROM patients WHERE patient_id = $1", [id])
  ).map(mapDBPatientToPatient)[0];
  if (!patient) {
    throw new NotFoundError("Patient not found");
  }
  return patient;
}

// @TODO sanitize input
export async function createPatient(patient: Patient): Promise<Patient> {
  const { name, dateOfBirth, medicalCondition, dateOfNextAppointment } =
    patient;
  const newPatient = (
    await query(
      "INSERT INTO patients (patient_name, patient_dob, patient_condition, patient_next_app) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, dateOfBirth, medicalCondition, dateOfNextAppointment]
    )
  ).map(mapDBPatientToPatient)[0];
  return newPatient;
}

// @TODO sanitize input
export async function updatePatient(
  id: string,
  patient: Patient
): Promise<Patient> {
  const { name, dateOfBirth, medicalCondition, dateOfNextAppointment } =
    patient;

  const originalPatient = (
    await query("SELECT * FROM patients WHERE patient_id = $1", [id])
  ).map(mapDBPatientToPatient)[0];
  if (!originalPatient) {
    throw new NotFoundError("Patient not found");
  }

  const patientNewFields = {
    ...originalPatient,
    id,
    name: name ?? originalPatient.name,
    dateOfBirth: dateOfBirth ?? originalPatient.dateOfBirth,
    medicalCondition: medicalCondition ?? originalPatient.medicalCondition,
    dateOfNextAppointment:
      dateOfNextAppointment ?? originalPatient.dateOfNextAppointment,
  };
  const updatedPatient = (
    await query(
      "UPDATE patients SET patient_name = $1, patient_dob = $2, patient_condition = $3, patient_next_app = $4 WHERE patient_id = $5 RETURNING *",
      [
        patientNewFields.name,
        patientNewFields.dateOfBirth,
        patientNewFields.medicalCondition,
        patientNewFields.dateOfNextAppointment,
        id,
      ]
    )
  ).map(mapDBPatientToPatient)[0];

  return updatedPatient;
}

// @TODO sanitize input
export async function removePatient(id: string): Promise<Patient> {
  const patient = (
    await query("DELETE FROM patients WHERE patient_id = $1 RETURNING *", [id])
  ).map(mapDBPatientToPatient)[0];

  if (!patient) {
    throw new NotFoundError("Patient not found");
  }

  return patient;
}

// @TODO sanitize input
export async function searchPatients(searchString: string): Promise<Patient[]> {
  const patients = await query(
    `
    SELECT * FROM patients
    WHERE patient_name ILIKE $1
    OR patient_condition ILIKE $1
    OR patient_dob::text ILIKE $1
    OR patient_next_app::text ILIKE $1
  `,
    [`%${searchString}%`]
  );
  return patients.map(mapDBPatientToPatient);
}
