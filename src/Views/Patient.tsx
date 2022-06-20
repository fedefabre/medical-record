import { useParams } from "react-router-dom"
import { useMutation, useQuery, UseQueryResult, useQueryClient } from 'react-query';
import { getPatient, getRecord, postRecord } from '../Api/MedicalRecordDB';
import { IPatient, IRecord, IRecordPost } from "../Models/Patients.models";
import { Box, Button, Flex, FormControl, FormErrorIcon, FormErrorMessage, Spinner, Stack, Textarea } from "@chakra-ui/react";
import { Resolver, useForm } from "react-hook-form";

export default function Patient() {
  const { patientId = '' } = useParams();
  const { data, isLoading, isIdle, error }: UseQueryResult<IPatient, Error> = useQuery<IPatient, Error>(['patient', patientId], () => getPatient(patientId));
  const { data: records, isLoading: recordIsLoading, error: recordError }: UseQueryResult<IRecord[], Error> = useQuery<IRecord[], Error>(['record', patientId], () => getRecord(patientId));
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<IRecordPost>({
    mode: "onChange"
  })

  // use mutation 

  const { mutate, isLoading: isLoadingMutation } = useMutation(postRecord, {
    onSuccess: () => {
      queryClient.invalidateQueries(['record', patientId]);
    }
  });


  function onSubmit(values: { record: string }) {
    mutate({ patient: patientId, record: values.record }, { onSuccess: (record) => queryClient.setQueryData(['record', patientId], (prevRecords: any) => prevRecords.concat(record)) })
  }

  if (isLoading || isIdle) {
    return <div>Loading...</div>
  }

  if (error || !data) {
    return <div>Error</div>
  }

  return (
    <Stack>
      <h1>{data.name}</h1>
      <Box>
        <Flex direction="column">
          <h2>Medical Record</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Textarea
                id='record'
                placeholder='Historia clínica de hoy'
                {...register('record', {
                  required: 'El nuevo registro es requerido',
                  minLength: 3
                })}
              />
              <FormErrorMessage>
                <span>{errors.record && errors.record.message}</span>
              </FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit' disabled={isValid || isLoadingMutation}>
              {isLoadingMutation && <Spinner size='sm' mr="1" />}
              Submit
            </Button>
          </form>
          {recordIsLoading && <Spinner />}
          {recordError && <FormErrorIcon />}
          {records && records.map(record => (
            <Box key={record._id}>
              <h3>{record.patient.name}</h3>
              <p>{record.record}</p>
              <p>{record.creationDate}</p>
              <hr></hr>
            </Box>
          ))}
        </Flex>
      </Box>
    </Stack>
  )
}
