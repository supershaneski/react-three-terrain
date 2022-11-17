import React from 'react'
import classes from './MapPanel.module.css'

const MapPanel = (props) => {

    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
        setOpen(f => !f)
    }

    const selectMap = (smap) => () => {
        props.onSelect(smap)
    }
    
    return (
        <div className={classes.container}>
            <div className={classes.header} onClick={handleOpen}>
                <span className={classes.headerText}>Maps</span>
            </div>
            <div style={{
                padding: '5px 10px',
                display: open ? 'block' : 'none',
            }}>
                <button onClick={selectMap('map2.jpg')} className={classes.button}>Map 1</button>
                <button onClick={selectMap('map8.png')} className={classes.button}>Map 2</button>
                <button onClick={selectMap('map9.jpg')} className={classes.button}>Map 3</button>
                <button onClick={selectMap('map12.png')} className={classes.button}>Map 4</button>
                <button onClick={selectMap('map16.jpg')} className={classes.button}>Map 5</button>
                <button onClick={selectMap('map19.jpg')} className={classes.button}>Map 6</button>
                <button onClick={selectMap('map20.jpg')} className={classes.button}>Map 7</button>
                <button onClick={selectMap('map23.jpg')} className={classes.button}>Map 8</button>
                <button onClick={selectMap('island3.jpg')} className={classes.button}>Map 9</button>
                <button onClick={selectMap('meteor.png')} className={classes.button}>Map 10</button>
                <button onClick={selectMap('')} className={classes.button}>Clear</button>
            </div>
        </div>
    )
}

export default MapPanel