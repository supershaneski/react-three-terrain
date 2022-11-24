import React from 'react'
import classes from './App.module.css'

import Scene from './components/Scene'
import ControlPanel from './components/ControlPanel'
import MapPanel from './components/MapPanel'
import { GlobalContext } from './store/GlobalState'

function App() {
  
  return (
    <div className={classes.container}>
      <div className={classes.canvas}>
        <Scene />
      </div>
      <div className={classes.maps}>
        <MapPanel />
      </div>
      <div className={classes.control}>
        <ControlPanel />
      </div>
      <GlobalContext.Consumer>
        {({ state }) => {
          return state.app.status === 1 ? <div className={classes.loader}><span>Loading...</span></div> : null
        }}
      </GlobalContext.Consumer>
    </div>
  )
}

export default App