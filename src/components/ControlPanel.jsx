import React from 'react'
import BasePanel from './BasePanel'
import Options from './Options'

const reliefFunctions = [
    { text: 'Grayscale', value: 0 },
    { text: 'Custom', value: 1 }
]

const navigationList = [
    { text: 'OrbitControls', value: 0 },
    { text: 'MapControls', value: 1 },
    { text: 'ArcballControls', value: 2 }
]

const ControlPanel = (props) => {
    return (
        <BasePanel title="Edit Options">
            <Options.SliderItem label="Level" value={props.level} onChange={props.onChangeLevel} />
            <Options.SelectItem label="Relief Function" value={props.reliefFunc} onChange={props.onChangeReliefFunc} items={reliefFunctions} />
            <Options.TextItem label="Red" disabled={props.reliefFunc === 0} value={props.redCoeff} onChange={props.onChangeRedCoeff} />
            <Options.TextItem label="Green" disabled={props.reliefFunc === 0} value={props.greenCoeff} onChange={props.onChangeGreenCoeff} />
            <Options.TextItem label="Blue" disabled={props.reliefFunc === 0} value={props.blueCoeff} onChange={props.onChangeBlueCoeff} />
            <Options.CheckItem label="Wireframe" checked={props.wireframe} onChange={props.onChangeWireframe} />
            <Options.CheckItem label="Normal Color" checked={props.normalColor} onChange={props.onChangeNormalColor} />
            <Options.CheckItem label="Flat Shading*" checked={props.flatShading} onChange={props.onChangeFlatShading} />
            <Options.CheckItem label="Use Texture*" checked={props.textureFlag} onChange={props.onChangeTextureFlag} />
            <Options.CheckItem label="Use Color" checked={props.colorFlag} onChange={props.onChangeColorFlag} />
            <Options.TextItem label="Color" disabled={!props.colorFlag} value={props.color} onChange={props.onChangeColor} />
            <Options.CheckItem label="Show Sea" checked={props.seaFlag} onChange={props.onChangeSeaFlag} />
            <Options.SliderItem label="Sea Level" disabled={!props.seaFlag} value={props.seaLevel} onChange={props.onChangeSeaLevel} />
            <Options.SelectItem label="Navigation" value={props.naviMode} onChange={props.onChangeNaviMode} items={navigationList} />
        </BasePanel>
    )
}

export default React.memo(ControlPanel)