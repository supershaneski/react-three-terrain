import React from 'react'
import classes from './ControlPanel.module.css'

const ControlPanel = (props) => {

    const [open, setOpen] = React.useState(false)

    const handleClick = () => {
        
        setOpen(f => !f)

    }

    return (
        <div className={classes.container}>
            <div className={classes.header} onClick={handleClick}>
                <span className={classes.headerText}>Options</span>
            </div>
            <div className={classes.main} style={{
                display: open ? 'block' : 'none',
            }}>
                <div className={classes.item}>
                    <label>Level</label>
                    <input type="range" min={1} max={100} 
                    value={props.level} onChange={props.onChangeLevel} />
                </div>
                <div className={classes.item}>
                    <label>Relief Function</label>
                    <select value={props.reliefFunc} onChange={props.onChangeReliefFunc}>
                        <option value={0}>Grayscale</option>
                        <option value={1}>Custom</option>
                    </select>
                </div>
                <div className={classes.item}>
                    <label style={{
                        color: props.reliefFunc === 0 ? '#555' : '#fff',
                    }}>Red</label>
                    <input className={classes.number} disabled={props.reliefFunc === 0} type="text" 
                    value={props.redCoeff} onChange={props.onChangeRedCoeff} />
                </div>

                <div className={classes.item}>
                    <label style={{
                        color: props.reliefFunc === 0 ? '#555' : '#fff',
                    }}>Green</label>
                    <input className={classes.number} disabled={props.reliefFunc === 0} type="text" 
                    value={props.greenCoeff} onChange={props.onChangeGreenCoeff} />
                </div>

                <div className={classes.item}>
                    <label style={{
                        color: props.reliefFunc === 0 ? '#555' : '#fff',
                    }}>Blue</label>
                    <input className={classes.number} disabled={props.reliefFunc === 0} type="text" 
                    value={props.blueCoeff} onChange={props.onChangeBlueCoeff} />
                </div>

                <div className={classes.item}>
                    <label>Use Wireframe</label>
                    <input type="checkbox" 
                    checked={props.wireframe} onChange={props.onChangeWireframe} />
                </div>
                <div className={classes.item}>
                    <label>Use NormalColor</label>
                    <input type="checkbox" 
                    checked={props.normalColor} onChange={props.onChangeNormalColor} />
                </div>
                <div className={classes.item}>
                    <label>Use FlatShading*</label>
                    <input type="checkbox" 
                    checked={props.flatShading} onChange={props.onChangeFlatShading} />
                </div>
                <div className={classes.item}>
                    <label>Use Texture*</label>
                    <input type="checkbox" 
                    checked={props.textureFlag} onChange={props.onChangeTextureFlag} />
                </div>
                <div className={classes.item}>
                    <label>Use Color</label>
                    <input type="checkbox"
                    checked={props.colorFlag} onChange={props.onChangeColorFlag} />
                </div>
                <div className={classes.item}>
                    <label style={{
                        color: !props.colorFlag ? '#555' : '#fff',
                    }}>Color</label>
                    <input disabled={!props.colorFlag} type="text" 
                    value={props.color} onChange={props.onChangeColor} />
                </div>
                <div className={classes.item}>
                    <label>Show Sea</label>
                    <input type="checkbox"
                    checked={props.seaFlag} onChange={props.onChangeSeaFlag} />
                </div>
                <div className={classes.item}>
                    <label style={{
                        color: !props.seaFlag ? '#555' : '#fff',
                    }}>Sea Level</label>
                    <input disabled={!props.seaFlag} type="range" min={1} max={10} 
                    value={props.seaLevel} onChange={props.onChangeSeaLevel} />
                </div>
                <div className={classes.item}>
                    <label>Navigation</label>
                    <select value={props.naviMode} onChange={props.onChangeNaviMode}>
                        <option value={0}>OrbitControls</option>
                        <option value={1}>MapControls</option>
                        <option value={2}>ArcballControls</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default ControlPanel