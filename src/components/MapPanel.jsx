import React from 'react'
import classes from './MapPanel.module.css'

const mapList = [
    { text: 'Map 1', map: 'map2.jpg' },
    { text: 'Map 2', map: 'map9.jpg' },
    { text: 'Map 3', map: 'map12.png' },
    { text: 'Map 4', map: 'island3.jpg' },
    { text: 'Map 5', map: 'map8.png' },
    { text: 'Map 6', map: 'meteor.png' },
]

const setClassButton = (selected) => selected ? [classes.button, classes.selected].join(' ') : classes.button

const MapPanel = (props) => {

    const [open, setOpen] = React.useState(false)
    
    const selectMap = (smap) => () => {
        props.onSelect(smap)
    }
    
    return (
        <div className={classes.container}>
            <div className={classes.header} onClick={() => setOpen(f => !f)}>
                <span className={classes.headerText} style={{
                    color: open ? '#646cff' : '#fff'
                }}>Select map</span>
            </div>
            <div className={classes.main} style={{
                display: open ? 'block' : 'none',
            }}>
                {
                    mapList.map((item) => {
                        return (
                            <button key={item.map} onClick={selectMap(item.map)} className={setClassButton(props.selected === item.map)}>{ item.text }</button>
                        )
                    })
                }
                <button onClick={selectMap('')} className={[classes.button, classes.clear].join(' ')}>Clear</button>
            </div>
        </div>
    )
}

export default MapPanel