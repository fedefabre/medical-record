import { IconButton } from '@chakra-ui/react'
import { FiArrowLeft } from 'react-icons/fi'
import { Outlet } from 'react-router-dom'

export default function Main() {
  

  return (
    <>
      <IconButton
        variant='outline'
        colorScheme='teal'
        aria-label='Call Sage'
        icon={<FiArrowLeft />} />
      <Outlet />
    </>
  )
}