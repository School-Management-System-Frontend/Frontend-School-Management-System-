import { StrictMode } from 'react'
import {FormProvider} from './context/FormContext.jsx';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <FormProvider>
    <App />
  </FormProvider>,
)
