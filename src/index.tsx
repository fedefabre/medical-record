import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './Styles/Themes/theme';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
