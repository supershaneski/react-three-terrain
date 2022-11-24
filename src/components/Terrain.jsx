import React from 'react'

import { scaleLinear } from "d3-scale"

import { 
    //PlaneGeometry, 
    //BoxGeometry, 
    //DoubleSide, 
    //RepeatWrapping, 
    TextureLoader, 
    //Float32BufferAttribute 
} from 'three'

import { 
    //Canvas, 
    useLoader, 
    //useFrame 
} from '@react-three/fiber'

/*
import { 
    Sky, 
    OrbitControls, 
    Text, 
    Text3D, 
    useTexture,
    Clone,
    Billboard,
} from '@react-three/drei'*/

import CustomBuffer from './CustomBuffer'

const MaterialShader = (props) => {

    if(props.wireframe) {

        if(props.colorMode === 0) {
            return <lineBasicMaterial linewidth={2} wireframe vertexColors />
        } else if(props.colorMode === 1) {
            return <lineBasicMaterial linewidth={2} wireframe color={props.color} />
        } else {
            return <meshNormalMaterial linewidth={2} wireframe />
        }

    } else {

        if(props.colorMode === 0) {
            return props.textureFlag ? <meshStandardMaterial map={props.texture} flatShading vertexColors /> : <meshStandardMaterial flatShading vertexColors />
        } else if(props.colorMode === 1) {
            return props.textureFlag ? <meshStandardMaterial map={props.texture} flatShading color={props.color} /> : <meshStandardMaterial flatShading color={props.color} />
        } else {
            return <meshNormalMaterial flatShading />
        }

    }

}

const domainList = [
    [ 0, 1/8, 1/4, 2/4, 3/4, 1 ],
    [ 0, 1/5, 2/5, 1 ],
    [ 0, 1/6, 1/4, 5/8, 6/7, 1 ],
    [ 0, 1/8, 1/2, 1 ],
    [ 0, 1/5, 1 ],
]

const colorList = [
    ["#010755", "#ffd7b3", "#005501", "#666000", "#663300", "#ffffff"],
    ["#010755", "#805500", "#604020", "#003311"],
    ["#000022", "#504422", "#881100", "#332000", "#523510", "#002505"],//004d00
    ["#222222", "#553210", "#461200", "#512105"],
    ["#660000", "#372213", "#746022"],
]

const scaleOption = (max, index = 0) => {
    return {
        domain: domainList[index].map(d => max * d),
        color: colorList[index]
    }
}

const formatValue = (v) => {
    return Math.round(10 * parseInt(v.trim())/255)/10
}

const getColor = (color) => {

    color = color.replace('rgb(','')
    color = color.replace(')','')

    let token = color.split(",")

    return {
        r: formatValue(token[0]),
        g: formatValue(token[1]),
        b: formatValue(token[2]),
    }
}

const Terrain = ({ mapData, options }) => {

    const { map, width, height, max, data } = mapData

    const level = options.level

    let texture = useLoader(TextureLoader, `/${map}`)

    let sep = 0.5

    const sOption = scaleOption(max, options.pattern)
    const colorScale = scaleLinear()
        .domain(sOption.domain)
        .range(sOption.color)

    let { positions, colors, normals } = React.useMemo(() => {

        let positions = [], colors = [], normals = []

        const bias = 1.2 * ((level - 50) / max)

        let k = 0

        for (let yi = 0; yi < height; yi++) {
            for (let xi = 0; xi < width; xi++) {
                
                let d = data[k]
                
                let x = sep * (xi - (width - 1) / 2)
                let y = sep * (yi - (height + 1) / 2)
                let z = bias * d.value

                positions.push(x, y, z)
                
                let color = getColor(colorScale(d.value))
                
                colors.push(color.r, color.g, color.b)
                
                normals.push(0, 0, 1)

                k++

            }
        }

        positions = new Float32Array(positions)
        colors = new Float32Array(colors)
        normals = new Float32Array(normals)

        return {
            positions,
            colors,
            normals,
        }

    }, [width, height, sep, level, max])

    let indices = React.useMemo(() => {

        let indices = []
        let i = 0

        for (let yi = 0; yi < height - 1; yi++) {
            for (let xi = 0; xi < width - 1; xi++) {
                indices.push(i, i + 1, i + width + 1)
                indices.push(i + width + 1, i + width, i)
                i++
            }
            i++
        }

        return new Uint16Array(indices)

    }, [width, height])

    let uvs = React.useMemo(() => {

        let uvs = []

        for (let y = height - 1; y >= 0; y--) {
            for (let x = 0; x < width; x++) {

                const u = Math.round(10000 * x / width)/10000
                const v = Math.round(10000 * y / height)/10000

                uvs.push(u, v)

            }
        }
        
        return new Float32Array(uvs)

    }, [width, height])

    const attributes = [
        { name: "attributes-position", items: positions, size: 3 },
        { name: "attributes-normal", items: normals, size: 3 },
        { name: "attributes-color", items: colors, size: 3 },
        { name: "attributes-uv", items: uvs, size: 2 },
        { name: "index", items: indices, size: 1 },
    ]

    return (
        <mesh rotation={[-0.5 * Math.PI, 0, 0]}>
            <CustomBuffer.Geometry attributes={attributes} />
            <MaterialShader texture={texture} {...options} />
        </mesh>
    )

}

Terrain.defaultProps = {
    mapData: null,
}

export default Terrain