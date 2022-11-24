import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import GlobalState from './store/GlobalState'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalState>
      <App />
    </GlobalState>
  </React.StrictMode>
)
