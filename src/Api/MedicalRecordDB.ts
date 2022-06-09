import axios from "axios";

export const MedicalRecordApi = axios.create({
  baseURL: 'http://localhost:8080/api',
  //baseURL: 'https://medical-record-mern.herokuapp.com/api',
})

export const getPatients = () => MedicalRecordApi.get('/patients', {params: {limite: 100}}).then(({ data }) => data);
export const getPatient = (id: string) => MedicalRecordApi.get(`/patients/${id}`).then(({ data }) => data);