import React from 'react'
import classes from './MapPanel.module.css'
import BasePanel from './BasePanel'

const mapList = [
    { text: 'Map 1', map: 'map2.jpg' },
    { text: 'Map 2', map: 'map9.jpg' },
    { text: 'Map 3', map: 'map12.png' },
    { text: 'Map 4', map: 'island3.jpg' },
    { text: 'Map 5', map: 'map8.png' },
    { text: 'Map 6', map: 'map26.png' },
    { text: 'Map 7', map: 'canyon.png' }, 
    { text: 'Map 8', map: 'victoria.jpg' }, 
]

const setClassButton = (selected) => selected ? [classes.button, classes.selected].join(' ') : classes.button

const MapPanel = (props) => {

    const selectMap = (smap) => () => {
        props.onSelect(smap)
    }

    return (
        <BasePanel title="Select Map">
            {
                mapList.map((item) => {
                    return (
                        <button key={item.map} onClick={selectMap(item.map)} className={setClassButton(props.selected === item.map)}>{ item.text }</button>
                    )
                })
            }
            <button onClick={selectMap('')} className={[classes.button, classes.clear].join(' ')}>Clear</button>
        </BasePanel>
    )
}

export default React.memo(MapPanel)