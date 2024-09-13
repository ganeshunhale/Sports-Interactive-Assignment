import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import App from './App.jsx'
import './index.css'
import RMSStoree from './Redux/ReduxStore.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={RMSStoree}>
    <App />
    </Provider>
  </StrictMode>,
)
