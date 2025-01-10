import { Patient } from "../types/patient";
import { NotFoundError } from "../types/error";

// dummy data
const patients: Patient[] = [
  {
    id: 1,
    name: "John Doe",
    dateOfBirth: "1991-01-01",
    medicalCondition: "Healthy",
    dateOfNextAppointment: "2023-12-01",
  },
  {
    id: 2,
    name: "Jane Doe",
    dateOfBirth: "1996-01-01",
    medicalCondition: "Healthy",
    dateOfNextAppointment: "2023-12-01",
  },
];

export async function getPatients(): Promise<Patient[]> {
  return patients;
}

export async function getPatient(id: number): Promise<Patient> {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    throw new NotFoundError("Patient not found");
  }
  return patient;
}

export async function createPatient(patient: Patient): Promise<Patient> {
  const { name, dateOfBirth, medicalCondition, dateOfNextAppointment } =
    patient;
  // Creates an id (db would do this)
  const id = patients.length + 1;
  const newPatient: Patient = {
    id,
    name,
    dateOfBirth,
    medicalCondition,
    dateOfNextAppointment,
  };
  patients.push(newPatient);
  return newPatient;
}

export async function updatePatient(
  id: number,
  patient: Patient
): Promise<Patient> {
  const { name, dateOfBirth, medicalCondition, dateOfNextAppointment } =
    patient;
  const originalPatient = patients.find((p) => p.id === id);
  if (!originalPatient) {
    throw new NotFoundError("Patient not found");
  }
  const updatedPatient = {
    ...originalPatient,
    name,
    dateOfBirth,
    medicalCondition,
    dateOfNextAppointment,
  };
  patients[patients.findIndex((p) => p.id === originalPatient.id)] =
    updatedPatient;
  return updatedPatient;
}

export async function removePatient(id: number): Promise<void> {
  const index = patients.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new NotFoundError("Patient not found");
  }
  patients.splice(index, 1);
}
