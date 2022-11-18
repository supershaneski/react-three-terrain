import React from 'react'
import Terrain from './Terrain'
import Sea from './Sea'

const Scene = ({ data, options }) => {

    const [mapData, setMapData] = React.useState(null)
    const [optionData, setOptionData] = React.useState(null)

    React.useEffect(() => {

        setMapData(data)

    }, [data])

    React.useEffect(() => {

        setOptionData(options)

    }, [options])

    if(!mapData || !optionData) {
        return null
    }

    return (
        <group>
            <Terrain mapData={mapData} options={optionData} />
            {
                optionData.seaFlag &&
                <Sea 
                level={optionData.seaLevel} 
                levelCoeff={optionData.seaLevelCoeff}
                moveFlag={optionData.seaMove}
                moveCoeff={optionData.seaMoveCoeff}
                />
            }
        </group>
    )
}

export default Scene