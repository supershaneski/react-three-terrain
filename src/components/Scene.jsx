import React from 'react'
import Terrain from './Terrain'

const Scene = (props) => {

    const [mapData, setMapData] = React.useState(null)

    React.useEffect(() => {

        setMapData(props.data)

    }, [props.data])

    if(!mapData) {
        return null
    }

    return (
        <Terrain mapData={mapData} options={props.options} />
    )
}

export default Scene