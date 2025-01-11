export interface Patient {
  id: number;
  name: string;
  dateOfBirth: string;
  medicalCondition: string;
  dateOfNextAppointment: string;
}

export interface DBPatient {
  patient_id: number;
  patient_name: string;
  patient_dob: string;
  patient_condition: string;
  patient_next_app: string;
}
