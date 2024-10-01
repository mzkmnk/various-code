import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';
import './index.css';

// Suggested code may be subject to a license. Learn more: ~LicenseLog:3177789950.
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);