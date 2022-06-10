import { IconButton } from '@chakra-ui/react'
import { FiArrowLeft } from 'react-icons/fi'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function Main() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isADeepRoute = pathname.split('/').length > 2;

  return (
    <>
      {/* { Nagivate back only when you are on a child route} */}
      {isADeepRoute && <IconButton
        variant='outline'
        colorScheme='teal'
        aria-label='Call Sage'
        icon={<FiArrowLeft />}
        onClick={() => navigate(-1)}
      />}
      <Outlet />
    </>
  )
}
