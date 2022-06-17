import { useParams } from "react-router-dom"
import { useQuery, UseQueryResult } from 'react-query';
import { getPatient } from "../Api/MedicalRecordDB";
import { IPatient } from "../Models/Patients.models";
import { Box, Button, Flex, Stack } from "@chakra-ui/react";

export default function Patient() {
  const { patientId = '' } = useParams();
  const { data, isLoading, error }: UseQueryResult<IPatient, Error> = useQuery<IPatient, Error>(['patient', patientId], () => getPatient(patientId));

  console.log('this is being called again');

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error || !data) {
    return <div>Error</div>
  }

  return (
    <Stack>
      <h1>{data.name}</h1>
      <Box>
        { /* Flex direction row */}

        <Flex direction="column">
          <h2>Medical Record</h2>
          <form>
            <label>
              Historia Clínica
              <textarea readOnly value="Bla" />
            </label>
            {/* submit */}
            <Button type="submit">Guardar</Button>
          </form>
        </Flex>
      </Box>
    </Stack>
  )
}
