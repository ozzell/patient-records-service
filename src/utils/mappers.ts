import { DBPatient, Patient } from "../types/patient";

export function mapDBPatientToPatient(dbPatient: DBPatient): Patient {
  return {
    id: dbPatient.patient_id,
    name: dbPatient.patient_name,
    dateOfBirth: dbPatient.patient_dob,
    medicalCondition: dbPatient.patient_condition,
    dateOfNextAppointment: dbPatient.patient_next_app,
  };
}
