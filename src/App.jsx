import React, { useCallback } from 'react'
import classes from './App.module.css'

import Three from './components/Three'
import Scene from './components/Scene'

import Clock from './components/Clock'
import ControlPanel from './components/ControlPanel'
import MapPanel from './components/MapPanel'

function App() {

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

  const handleMapClick = useCallback((map) => {

    console.log("map click", map, loading)

    if(loading) {
      return
    }

    if(!map) {
      setMapSource(null)
      return
    }

    setLoading(true)
    setMapSource(map)

  }, [loading])

  const handleChangeTexture = (e) => {

    setTextureFlag(e.target.checked)

    const tmpMap = mapSource

    setLoading(true)
    setMapSource(null)
    

    setTimeout(() => {

      setMapSource(tmpMap)
      
    }, 300)

  }

  const handleChangeFlatShading = (e) => {
    
    setFlatShading(e.target.checked)

    const tmpMap = mapSource

    setLoading(true)
    setMapSource(null)
    
    setTimeout(() => {

      setMapSource(tmpMap)
      
    }, 300)

  }
  
  return (
    <div className={classes.container}>
      <div className={classes.canvas}>
        <Three.Stage naviMode={naviMode}>
          <Scene data={mapData} 
          options={{ 
            level: level, 
            normalColor: normalColor,
            wireframe: wireframe,
            flatShading: flatShading,
            textureFlag: textureFlag,
            colorFlag: colorFlag,
            color: color,
            seaLevel: seaLevel,
            seaFlag: seaFlag,
          }} />
        </Three.Stage>
      </div>
      <div className={classes.maps}>
        <MapPanel selected={mapSource} onSelect={handleMapClick} />
      </div>
      <div className={classes.control}>
        <ControlPanel 
        level={level}
        onChangeLevel={(e) => setLevel(e.target.value)}
        reliefFunc={reliefFunc}
        onChangeReliefFunc={(e) => setReliefFunc(parseInt(e.target.value))}
        redCoeff={redCoeff}
        onChangeRedCoeff={(e) => setRedCoeff(e.target.value)}
        greenCoeff={greenCoeff}
        onChangeGreenCoeff={(e) => setGreenCoeff(e.target.value)}
        blueCoeff={blueCoeff}
        onChangeBlueCoeff={(e) => setBlueCoeff(e.target.value)}
        normalColor={normalColor}
        onChangeNormalColor={(e) => setNormalColor(e.target.checked)}
        wireframe={wireframe}
        onChangeWireframe={(e) => setWireframe(e.target.checked)}
        flatShading={flatShading}
        onChangeFlatShading={handleChangeFlatShading}
        textureFlag={textureFlag}
        onChangeTextureFlag={handleChangeTexture}
        colorFlag={colorFlag}
        onChangeColorFlag={(e) => setColorFlag(e.target.checked)}
        color={color}
        onChangeColor={(e) => setColor(e.target.value)}
        naviMode={naviMode}
        onChangeNaviMode={(e) => setNaviMode(parseInt(e.target.value))}
        seaFlag={seaFlag}
        onChangeSeaFlag={(e) => setSeaFlag(e.target.checked)}
        seaLevel={seaLevel}
        onChangeSeaLevel={(e) => setSeaLevel(e.target.value)}
        />
      </div>
      {
        loading &&
        <div className={classes.loader}>
          <span>Loading...</span>
        </div>
      }
      <div className={classes.time}>
        <Clock />
      </div>
    </div>
  )
}

export default App