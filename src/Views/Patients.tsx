import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useState } from 'react';
import { Box, Button, Center, Flex, Spacer, Stack, useConst } from '@chakra-ui/react';
import { FiPlusSquare } from 'react-icons/fi';

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

  return (
    <Stack>
      <h1>Pacientes</h1>
      <Box>
        <Stack>
          <>
            <Flex >
              <Center>Listado de pacientes</Center>
              <Spacer />
              <Button leftIcon={<FiPlusSquare />} colorScheme='teal' variant='solid'>
                Nuevo paciente
              </Button>
            </Flex>
          </>
          <Box className="ag-theme-alpine" style={{ height: '80vh'}}>
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
  );
};
