import {
  FiSettings,
  FiCalendar,
  FiUsers,
  FiPaperclip,
} from 'react-icons/fi';

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Text } from '@chakra-ui/react';

import SideBar from "./Skeleton/Sidebar/Sidebar";
import Patients from "./Views/Patients";
import { LinkItemProps } from "./Skeleton/Sidebar/Models/Sidebar.models";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Patient from './Views/Patient';

const queryClient = new QueryClient()

export default function App() {

  const linkItems: LinkItemProps[] = [
    { name: 'Calendario', icon: FiCalendar },
    { name: 'Pacientes', icon: FiUsers, url: '/patients' },
    { name: 'Historias clínicas', icon: FiPaperclip },
    { name: 'Configuración', icon: FiSettings },
  ];

  const logo = <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">Focus</Text>;

  // TODO: Abstract wrappers

  return (
    <BrowserRouter>
      <SideBar linkItems={linkItems} Logo={logo}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<>Default component</>} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patient/:patientName/:patientId" element={<Patient />} />
            <Route path="*" element={<>Not found</>} />
          </Routes>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </SideBar>
    </BrowserRouter>
  )
};
