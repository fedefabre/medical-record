import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useRef, useState } from 'react';
import { Box, Button, Center, Flex, FormLabel, Input, Select, Spacer, Stack, Textarea, useConst, useDisclosure } from '@chakra-ui/react';
import { FiPlusSquare } from 'react-icons/fi';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { getPatients, MedicalRecordApi } from '../Api/MedicalRecordDB';
import { useForm } from '../Hooks/useForm';
import { useQuery } from 'react-query';
import { CellClickedEvent } from 'ag-grid-community';
import { useNavigate } from 'react-router-dom';

export default function Patients() {

  const navigation = useNavigate();
  const [rowData, setRowData] = useState<any>([]);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef() as React.MutableRefObject<HTMLInputElement>;
  // TODO add skeleton for the grid and the content
  const { isLoading, error } = useQuery('patients', getPatients, {
    onSuccess: (data) => {
      setRowData(data.patients);
    }
  });

  function convertToSlug(text: string): string {
    return text.toLowerCase()
               .replace(/[^\w ]+/g, '')
               .replace(/ +/g, '-');
  }

  const columns = useConst([
    { headerName: 'Nombre', field: 'name', onCellClicked: (event: CellClickedEvent) => navigation(`/patient/${convertToSlug(event.data.name)}/${event.data.uid}`) },
    { headerName: 'Correo', field: 'email' },
    { headerName: 'Telefono', field: 'phone' },
    { headerName: 'Profesional', field: 'doctor', valueGetter: (params: any) => params.data.doctor.nombre },
  ]);

  // TODO: Remove this when the API is ready
  var maxNumber = 45;
  var randomNumber = Math.floor((Math.random() * maxNumber) + 1);

  const { name, email, phone, onChange, form } = useForm({
    name: 'Mercedes Palazzo',
    email: `mercepalazzo${randomNumber}@hotmail.com`,
    phone: '51546546',
    doctor: '627aaa1814202566d0047f95',
    description: ''
  })

  const sendForm = () => {
    MedicalRecordApi.post('/patients', form, {
      headers: {
        'Content-Type': 'application/json',
        'x-token': localStorage.getItem('token') || ''
      },
    })
      .then(({ data }) => {
        setRowData([...rowData, data])
        onClose()
      })
      .catch(console.log)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <>
      <Stack>
        <h1>Pacientes</h1>
        <Box>
          <Stack>
            <Flex>
              <Center>Listado de pacientes</Center>
              <Spacer />
              <Button leftIcon={<FiPlusSquare />} onClick={onOpen}>
                Nuevo paciente
              </Button>
            </Flex>
            <Box className="ag-theme-alpine" style={{ height: '80vh' }}>
              <AgGridReact
                columnDefs={columns}
                rowData={rowData}
                suppressRowClickSelection={true}
                rowSelection={'multiple'}
              />
            </Box>
          </Stack>
        </Box>
      </Stack>
      <Drawer
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Agregar nuevo paciente
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
                <FormLabel htmlFor='username'>Nombre</FormLabel>
                <Input
                  ref={firstField}
                  id='username'
                  placeholder='Nombre y apellido paciente'
                  value={name}
                  onChange={(e) => onChange(e.target.value, 'name')}
                />
              </Box>
              <Box>
                <FormLabel htmlFor='email'>Correo</FormLabel>
                <Input
                  id='email'
                  placeholder='Mail paciente'
                  value={email}
                  onChange={(e) => onChange(e.target.value, 'email')}
                />
              </Box>
              <Box>
                <FormLabel htmlFor='phone'>Telefono</FormLabel>
                <Input
                  id='phone'
                  placeholder='Telefono paciente'
                  value={phone}
                  onChange={(e) => onChange(e.target.value, 'phone')}
                />
              </Box>

              <Box>
                <FormLabel htmlFor='doctor'>Profesional a cargo</FormLabel>
                <Select id='owner' defaultValue='627aaa1814202566d0047f95'>
                  <option value='627aaa1814202566d0047f95'>Mercedes Palazzo</option>
                  <option value='627aaa1814202566d0047f95'>Florencia</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor='detalle'>Detalle consulta</FormLabel>
                <Textarea id='detalle' />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme='teal' onClick={sendForm}>Guardar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
