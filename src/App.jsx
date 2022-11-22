import React, { useCallback } from 'react'
import classes from './App.module.css'

//import Three from './components/Three'
import Scene from './components/Scene'

import Clock from './components/Clock'
import ControlPanel from './components/ControlPanel'
import MapPanel from './components/MapPanel'

import useDebounce from './utils/useDebounce'
import { GlobalContext } from './store/GlobalState'

function App() {

  const { state, dispatch } = React.useContext(GlobalContext)
  //state.app.isDarkMode
  //dispatch({type: 'app-set', payload: { isDarkMode: isDarkMode }})

  const [loading, setLoading] = React.useState(false)
  const [mapData, setMapData] = React.useState(null)
  const [mapSource, setMapSource] = React.useState('')

  const [level, setLevel] = React.useState(70)
  const [normalColor, setNormalColor] = React.useState(false)
  const [wireframe, setWireframe] = React.useState(false)
  const [flatShading, setFlatShading] = React.useState(true)
  const [textureFlag, setTextureFlag] = React.useState(true)
  const [colorFlag, setColorFlag] = React.useState(true)
  const [color, setColor] = React.useState("#642310")

  const [reliefFunc, setReliefFunc] = React.useState(0)
  const [redCoeff, setRedCoeff] = React.useState(0.21)
  const [greenCoeff, setGreenCoeff] = React.useState(0.72)
  const [blueCoeff, setBlueCoeff] = React.useState(0.07)

  const [naviMode, setNaviMode] = React.useState(0)

  const [seaFlag, setSeaFlag] = React.useState(true)
  const [seaLevel, setSeaLevel] = React.useState(2)
  const [seaLevelCoeff, setSeaLevelCoeff] = React.useState(0.5)
  const [seaMove, setSeaMove] = React.useState(true)
  const [seaMoveCoeff, setSeaMoveCoeff] = React.useState(0.25)

  const debouncedLevel = useDebounce(level, 200)

  //React.useEffect(() => console.log("level", debouncedLevel), [debouncedLevel])
  
  React.useEffect(() => {

    const loadImage = () => {

      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      
      const ctx = canvas.getContext('2d')

      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
            
      let data = []
      let max = 0

      let red = parseFloat(redCoeff)
      let green = parseFloat(greenCoeff)
      let blue = parseFloat(blueCoeff)

      for(var y = 0; y < img.naturalHeight; y++){
        for(var x = 0; x < img.naturalWidth; x++){
          
          var pixeldata = ctx.getImageData(x, y, 1, 1).data
          
          const gs = reliefFunc > 0 ? (red * pixeldata[0]) + (green * pixeldata[1]) + (blue * pixeldata[2]) : (0.21 * pixeldata[0]) + (0.72 * pixeldata[1]) + (0.07 * pixeldata[2])
          
          max = max < gs ? gs : max

          data.push({
              x,
              y,
              value: gs,
          })

        }
      }
      
      setMapData({
        map: mapSource,
        width: img.naturalWidth,
        height: img.naturalHeight,
        max: max,
        data: data,
      })

      setLoading(false)

    }
    
    const loadError = () => {
      setLoading(false)
      setMapData(null)
    }

    const img = new Image()
    img.addEventListener('load', loadImage)
    img.addEventListener('error', loadError)
    img.src = `/${mapSource}`

  }, [mapSource])

  const handleMapClick = useCallback((map, nlevel) => {
    
    if(loading) {
      return
    }

    if(!map) {
      setMapSource(null)
      return
    }

    setLoading(true)
    setLevel(nlevel)
    setMapSource(map)
    

  }, [loading])

  const handleChangeLevel = useCallback((e) => {

    setLevel(e.target.value)

    if(!mapSource) {
      return
    }

    const tmpMap = mapSource

    setLoading(true)
    setMapSource(null)
    
    setTimeout(() => {

      setMapSource(tmpMap)
      
    }, 300)

  }, [mapSource])

  const handleChangeTexture = useCallback((e) => {

    setTextureFlag(e.target.checked)

    if(!mapSource) {
      return
    }

    const tmpMap = mapSource

    setLoading(true)
    setMapSource(null)
    

    setTimeout(() => {

      setMapSource(tmpMap)
      
    }, 300)

  }, [mapSource])

  const handleChangeFlatShading = useCallback((e) => {

    setFlatShading(e.target.checked)

    if(!mapSource) {
      return
    }
    
    const tmpMap = mapSource

    setLoading(true)
    setMapSource(null)
    
    setTimeout(() => {

      setMapSource(tmpMap)
      
    }, 300)

  }, [mapSource])
  
  return (
    <div className={classes.container}>
      <div className={classes.canvas}>
        <Scene />
      </div>
      <div className={classes.maps}>
        <MapPanel />
      </div>
      <div className={classes.control}>
        <ControlPanel />
      </div>
      <GlobalContext.Consumer>
        {({ state }) => {
          return state.app.status === 1 ? <div className={classes.loader}><span>Loading...</span></div> : null
        }}
      </GlobalContext.Consumer>
      <div className={classes.time}>
        <Clock />
      </div>
    </div>
  )
}

export default App