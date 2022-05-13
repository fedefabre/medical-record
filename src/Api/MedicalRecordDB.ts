import axios from "axios";

export const MedicalRecordApi = axios.create({
  // baseURL: 'http://localhost:8080/api',
  baseURL: 'https://medical-record-mern.herokuapp.com/api',
})