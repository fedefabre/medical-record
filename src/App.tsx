import SideBar from "./Skeleton/Sidebar/Sidebar";
import {
  FiSettings,
  FiCalendar,
  FiUsers,
  FiPaperclip,
} from 'react-icons/fi';
import { LinkItemProps } from "./Skeleton/Sidebar/Models/Sidebar.models";
import { Text } from '@chakra-ui/react';
import Patients from "./Views/Patients";

export default function App() {

  const linkItems: LinkItemProps[] = [
    { name: 'Calendario', icon: FiCalendar },
    { name: 'Pacientes', icon: FiUsers },
    { name: 'Historias clínicas', icon: FiPaperclip },
    { name: 'Configuración', icon: FiSettings },
  ];

  const logo = <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">Focus</Text>;

  return (
    <SideBar linkItems={linkItems} Logo={logo}>
      <Patients />
    </SideBar>
  )
};
  