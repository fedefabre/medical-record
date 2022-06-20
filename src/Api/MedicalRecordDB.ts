import axios from "axios";
import { IRecordPost } from "../Models/Patients.models";

export const MedicalRecordApi = axios.create({
  baseURL: 'http://localhost:8080/api',
  //baseURL: 'https://medical-record-mern.herokuapp.com/api',
})

const getHeaders = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'x-token': localStorage.getItem('token') || ''
    }
  }
}


export const getPatients = () => MedicalRecordApi.get('/patients').then(({ data }) => data);
export const getPatient = (id: string) => MedicalRecordApi.get(`/patients/${id}`).then(({ data }) => data);
// TODO: Add interface to form data
export const postPatient = (form: any) => MedicalRecordApi.post('/patients', form, getHeaders())

export const getRecords = () => MedicalRecordApi.get('/records').then(({ data }) => data.records);
export const getRecord = (id: string) => MedicalRecordApi.get(`/records/${id}`).then(({ data }) => data);
export const postRecord = ({ patient, record }: IRecordPost & { patient: string }) => MedicalRecordApi.post(`/records`, { patient, record }, getHeaders()).then(({ data }) => data);
