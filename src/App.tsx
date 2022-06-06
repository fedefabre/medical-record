import {
  FiSettings,
  FiCalendar,
  FiUsers,
  FiPaperclip,
} from 'react-icons/fi';

import { QueryClient, QueryClientProvider } from 'react-query'
import { Text } from '@chakra-ui/react';

import SideBar from "./Skeleton/Sidebar/Sidebar";
import Patients from "./Views/Patients";
import { LinkItemProps } from "./Skeleton/Sidebar/Models/Sidebar.models";

const queryClient = new QueryClient()

export default function App() {

  const linkItems: LinkItemProps[] = [
    { name: 'Calendario', icon: FiCalendar },
    { name: 'Pacientes', icon: FiUsers },
    { name: 'Historias clínicas', icon: FiPaperclip },
    { name: 'Configuración', icon: FiSettings },
  ];

  const logo = <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">Focus</Text>;

  // TODO: Abstract wrappers

  return (
    <SideBar linkItems={linkItems} Logo={logo}>
      <QueryClientProvider client={queryClient}>
        { /* Router  */}
        <Patients />
      </QueryClientProvider>
    </SideBar>
  )
};
