export interface IPatient {
  name: string;
  email: string;
  phone: string;
  doctor: any;
}

export interface IRecord {
  _id: string;
  record: string;
  patient: IPatient;
  creationDate: string;
}

export interface IRecordPost {
  record: string;
}