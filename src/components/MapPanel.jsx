import React from 'react'
import classes from './MapPanel.module.css'
import BasePanel from './BasePanel'
import { GlobalContext } from '../store/GlobalState'

const mapList = [
    { text: 'Map 1', map: 'map2.jpg', level: 70 },
    { text: 'Map 2', map: 'map9.jpg', level: 65 },
    { text: 'Map 3', map: 'map12.png', level: 70 },
    { text: 'Map 4', map: 'island3.jpg', level: 63 },
    { text: 'Map 5', map: 'map8.png', level: 55 },
    { text: 'Map 6', map: 'map26.png', level: 55 },
    { text: 'Map 7', map: 'canyon.png', level: 65 }, 
    { text: 'Map 8', map: 'victoria.jpg', level: 60 },
]

const setClassButton = (selected) => selected ? [classes.button, classes.selected].join(' ') : classes.button

const MapPanel = () => {

    const {state, dispatch} = React.useContext(GlobalContext)
    
    const selectMap = (smap, level = 70) => () => {
        dispatch({ type: 'app-set', payload: {
            mapSource: smap,
            level: level,
        }})
    }

    return (
        <BasePanel title="Select Map">
            {
                mapList.map((item) => {
                    return (
                        <button key={item.map} 
                        onClick={selectMap(item.map, item.level)} 
                        className={setClassButton(state.app.mapSource === item.map)}>{ item.text }</button>
                    )
                })
            }
            <button onClick={selectMap('')} className={[classes.button, classes.clear].join(' ')}>Clear</button>
        </BasePanel>
    )
}

export default React.memo(MapPanel)