import React from 'react'
import classes from './MapPanel.module.css'
import BasePanel from './BasePanel'
import Options from './Options'
import { GlobalContext } from '../store/GlobalState'

const reliefFunctions = [
    { text: 'Grayscale', value: 0 },
    { text: 'Custom', value: 1 }
]

const navigationList = [
    { text: 'OrbitControls', value: 0 },
    { text: 'MapControls', value: 1 },
    { text: 'ArcballControls', value: 2 }
]

const colorModeList = [
    { text: 'VertexColor', value: 0 },
    { text: 'Color', value: 1 },
    { text: 'NormalColor', value: 2 },
]

const ControlPanel = () => {

    const { state, dispatch } = React.useContext(GlobalContext)

    const setDispatch = (payload) => {
        dispatch({type: 'app-set', payload})
    }

    const handleReload = () => {

        setDispatch({ status: 1 })

        setTimeout(setDispatch, 300, { status: 0 })

    }

    return (
        <BasePanel title="Edit Options">
            <Options.SliderItem label="Level" 
            value={state.app.level} 
            onChange={(e) => setDispatch({ level: parseInt(e.target.value) })}
            />
            <Options.CheckItem label="Wireframe" 
            checked={state.app.wireframe} 
            onChange={(e) => setDispatch({ wireframe: e.target.checked })}
            />
            <Options.SelectItem label="Color Mode"
            value={state.app.colorMode}
            onChange={(e) => setDispatch({ colorMode: parseInt(e.target.value) })}
            items={colorModeList}
            />
            <Options.CheckItem label="Texture"
            disabled={state.app.colorMode === 2}
            checked={state.app.textureFlag}
            onChange={(e) => setDispatch({ textureFlag: e.target.checked })}
            />
            <Options.TextItem label="Color"
            disabled={!(state.app.colorMode === 1)}
            value={state.app.color}
            onChange={(e) => setDispatch({ colorMode: e.target.value })}
            />
            <Options.CheckItem label="Show Sea"
            checked={state.app.seaFlag}
            onChange={(e) => setDispatch({ seaFlag: e.target.checked })}
            />
            <Options.SliderItem label="Sea Level"
            disabled={!state.app.seaFlag}
            value={state.app.seaLevel}
            onChange={(e) => setDispatch({ seaLevel: parseInt(e.target.value) })}
            />
            <Options.TextItem label="Level Factor" width="3em"
            disabled={!state.app.seaFlag} 
            value={state.app.seaLevelCoeff}
            onChange={(e) => setDispatch({ seaLevelCoeff: e.target.value })}
            />
            <Options.CheckItem label="Animated"
            disabled={!state.app.seaFlag}
            checked={state.app.seaMove}
            onChange={(e) => setDispatch({ seaMove: e.target.checked })}
            />
            <Options.TextItem label="Jerk Factor" width="3em"
            disabled={!state.app.seaMove || !state.app.seaFlag} 
            value={state.app.seaMoveCoeff}
            onChange={(e) => setDispatch({ seaMoveCoeff: e.target.value })}
            />
            <Options.SelectItem label="Navigation"
            value={state.app.naviMode}
            onChange={(e) => setDispatch({ naviMode: e.target.value })}
            items={navigationList}
            />
            <button onClick={handleReload} className={[classes.button, classes.clear].join(' ')}>Reload</button>
        </BasePanel>
    )
}

export default React.memo(ControlPanel)