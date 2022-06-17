export interface IPatient {
  name: string;
  email: string;
  phone: string;
  doctor: any;
}

export interface IRecord {
  id: string;
  record: string;
  patient: IPatient;
  
}