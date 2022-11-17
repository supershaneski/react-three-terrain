import React from 'react'
import Terrain from './Terrain'
import Sea from './Sea'

const Scene = (props) => {

    const [mapData, setMapData] = React.useState(null)

    React.useEffect(() => {

        setMapData(props.data)

    }, [props.data])

    if(!mapData) {
        return null
    }

    return (
        <group>
            <Terrain mapData={mapData} options={props.options} />
            {
                props.options.seaFlag &&
                <Sea level={props.options.seaLevel} />
            }
        </group>
    )
}

export default Scene