import { useParams } from "react-router-dom"
import { useQuery, UseQueryResult } from 'react-query';
import { getPatient, getRecord } from '../Api/MedicalRecordDB';
import { IPatient, IRecord } from "../Models/Patients.models";
import { Box, Button, Flex, FormControl, FormErrorMessage, Stack, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export default function Patient() {
  const { patientId = '' } = useParams();
  const { data, isLoading, isIdle, error }: UseQueryResult<IPatient, Error> = useQuery<IPatient, Error>(['patient', patientId], () => getPatient(patientId));
  const { data: records, isLoading: recordIsLoading, error: recordError }: UseQueryResult<IRecord[], Error> = useQuery<IRecord[], Error>(['record', patientId], () => getRecord(patientId));

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  if (isLoading || isIdle) {
    return <div>Loading...</div>
  }

  if (error || !data) {
    return <div>Error</div>
  }

  function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <Stack>
      <h1>{data.name}</h1>
      <Box>
        <Flex direction="column">
          <h2>Medical Record</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.name}>
              <Textarea
                id='record'
                placeholder='Historia clínica de hoy'
                {...register('record', {
                  required: 'This is required'
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
              Submit
            </Button>
          </form>
          {records && records.map(record => (
            <Box key={record.id}>
              <h3>{record.patient.name}</h3>
              <p>{record.record}</p>
            </Box>
          ))}
        </Flex>
      </Box>
    </Stack>
  )
}
