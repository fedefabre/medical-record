import { useParams } from "react-router-dom"
import { useQuery, UseQueryResult } from 'react-query';
import { getPatient } from "../Api/MedicalRecordDB";
import { IPatient } from "../Models/Patients.interface";

export default function Patient() {
  const { patientId = ''} = useParams();
  const { data, isLoading, error }: UseQueryResult<IPatient, Error> = useQuery<IPatient, Error>(['patient', patientId], () => getPatient(patientId));

  console.log('this is being called again');

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error || !data) {
    return <div>Error</div>
  }

  return (
    <div>{data.name}</div>
  )
}
