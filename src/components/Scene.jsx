import React from 'react'
import Terrain from './Terrain'
import Sea from './Sea'
import Three from './Three'
import { GlobalContext } from '../store/GlobalState'

const Scene = () => {
    
    const { state, dispatch } = React.useContext(GlobalContext)

    //const [mapData, setMapData] = React.useState(null)
    //const [optionData, setOptionData] = React.useState(null)

    const [mapData, setMapData] = React.useState(null)

    React.useEffect(() => {

        const loadImage = () => {

            console.log("load image...")

            const canvas = document.createElement('canvas')
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight
      
            const ctx = canvas.getContext('2d')

            ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
            
            let data = []
            let max = 0
            
            for(var y = 0; y < img.naturalHeight; y++){
                for(var x = 0; x < img.naturalWidth; x++){
                
                    var pixeldata = ctx.getImageData(x, y, 1, 1).data
                    
                    const gs = (0.21 * pixeldata[0]) + (0.72 * pixeldata[1]) + (0.07 * pixeldata[2])
                    
                    max = max < gs ? gs : max

                    data.push({
                        x,
                        y,
                        value: gs,
                    })

                }
            }

            setMapData({
                map: state.app.mapSource,
                width: img.naturalWidth,
                height: img.naturalHeight,
                max: max,
                data: data,
            })

            //dispatch({ type: 'app-set', payload: { status: 0 }})
            setDispatch({ status: 0 })
            
        }

        const errorImage = () => {
            console.log("error loading image")
            //dispatch({ type: 'app-set', payload: { status: 2 }})
            setDispatch({ status: 2 })
            setMapData(null)
        }
        
        const img = new Image()
        img.addEventListener('load', loadImage)
        img.addEventListener('error', errorImage)

        if(state.app.mapSource) {

            //dispatch({ type: 'app-set', payload: { status: 1 }})
            setDispatch({ status: 1 })

            img.src = `/${state.app.mapSource}`

        } else {

            //dispatch({ type: 'app-set', payload: { status: 0 }})
            setDispatch({ status: 0 })
            setMapData(null)

        }

        return () => {
            img.removeEventListener('load', loadImage)
            img.removeEventListener('error', errorImage)
        }

    }, [state.app.mapSource])

    const setDispatch = (payload) => {
        dispatch({type: 'app-set', payload})
    }

    if(state.app.status === 2) {
        return (
            <span style={{color: '#FF6767'}}>Error loading map</span>
        )
    }

    if(state.app.status === 1) {
        return null
    }

    if(!mapData) {
        return null
    }

    return (
        <Three.Stage height={0.3 * mapData.max} distance={0.5 * mapData.width} naviMode={state.app.naviMode}>
            <Terrain mapData={mapData} options={{
                pattern: state.app.pattern,
                level: state.app.level,
                wireframe: state.app.wireframe,
                colorMode: state.app.colorMode,
                textureFlag: state.app.textureFlag,
                color: state.app.color,
            }} />
            <GlobalContext.Consumer>
                {({ state }) => {
                    return state.app.seaFlag ? <Sea 
                    width={mapData.width}
                    height={mapData.height}
                    /> : null
                }}
            </GlobalContext.Consumer>
        </Three.Stage>
    )
}

export default Scene