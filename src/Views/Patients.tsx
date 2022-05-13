import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useRef, useState } from 'react';
import { Box, Button, Center, Flex, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Spacer, Stack, Textarea, useConst, useDisclosure } from '@chakra-ui/react';
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

export default function App() {

  const columns = useConst([
    { headerName: 'Nombre', field: 'name' },
    { headerName: 'Correo', field: 'email' },
    { headerName: 'Telefono', field: 'phone' },
    { headerName: 'Profesional', field: 'doctor' },
  ]);

  const [rowData] = useState([
    { name: 'Juan Perez', email: 'asd@asd', phone: '123456789', doctor: 'Dr. Juan Perez' },
    { name: 'Juan Perez', email: 'asd@asd', phone: '123456789', doctor: 'Dr. Juan Perez' },
    { name: 'Juan Perez', email: 'asd@asd', phone: '123456789', doctor: 'Dr. Juan Perez' },
    { name: 'Juan Perez', email: 'asd@asd', phone: '123456789', doctor: 'Dr. Juan Perez' }
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <>
      <Stack>
        <h1>Pacientes</h1>
        <Box>
          <Stack>
            <>
              <Flex >
                <Center>Listado de pacientes</Center>
                <Spacer />
                <Button leftIcon={<FiPlusSquare />} colorScheme='teal' variant='solid' onClick={onOpen}>
                  Nuevo paciente
                </Button>
              </Flex>
            </>
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
                />
              </Box>
              <Box>
                <FormLabel htmlFor='email'>Correo</FormLabel>
                <Input
                  id='email'
                  placeholder='Mail paciente'
                />
              </Box>
              <Box>
                <FormLabel htmlFor='phone'>Telefono</FormLabel>
                <Input
                  id='phone'
                  placeholder='Telefono paciente'
                />
              </Box>

              <Box>
                <FormLabel htmlFor='doctor'>Profesional a cargo</FormLabel>
                <Select id='owner' defaultValue='mercedes'>
                  <option value='mercedes'>Mercedes Palazzo</option>
                  <option value='florencia'>Florencia</option>
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
            <Button colorScheme='teal'>Guardar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
