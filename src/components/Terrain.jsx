import React from 'react'

import { 
    PlaneGeometry, 
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

const MaterialShader = (props) => {
    
    if(props.normalColor) {
        
        return <meshNormalMaterial wireframe={props.wireframe} flatShading={props.flatShading} />

    } else {

        if(props.colorFlag) {
            
            if(props.textureFlag) {

                if(props.wireframe) {

                    return <lineBasicMaterial
                    wireframe={props.wireframe} 
                    flatShading={props.flatShading}
                    color={props.color}
                    linewidth={2}
                    />

                } else {

                    return <meshStandardMaterial
                    flatShading={props.flatShading}
                    color={props.color}
                    map={props.texture}
                    />

                }

                

            } else {

                if(props.wireframe) {

                    return <lineBasicMaterial
                    wireframe={props.wireframe} 
                    flatShading={props.flatShading}
                    color={props.color}
                    linewidth={2}
                    />

                } else {

                    return <meshStandardMaterial
                    flatShading={props.flatShading}
                    color={props.color}
                    />

                }
            }
            
        } else {

            if(props.textureFlag) {

                if(props.wireframe) {

                    return <lineBasicMaterial
                    wireframe={props.wireframe} 
                    flatShading={props.flatShading}
                    linewidth={2}
                    />

                } else {

                    return <meshStandardMaterial
                    flatShading={props.flatShading}
                    map={props.texture}
                    />

                }

            } else {

                if(props.wireframe) {
                    return <lineBasicMaterial
                    wireframe={props.wireframe} 
                    flatShading={props.flatShading}
                    linewidth={2}
                    />
                } else {
                    return <meshStandardMaterial
                    flatShading={props.flatShading}
                    />
                }

            }
            
        }
        
    }

}

const Terrain = ({ mapData, options }) => {

    const { map, width, height, max, data } = mapData

    let texture = useLoader(TextureLoader, `/${map}`)

    const geometry = new PlaneGeometry( 50, 50, width - 1, height - 1 )
    const verts = geometry.attributes.position.array

    const delta = (options.level - 50) / max

    for (let i = 0; i < verts.length; i+=3) {
    
        let k = parseInt(i / 3)

        if(k < data.length) {
            verts[i + 2] = delta * data[k].value
        }

    }
    
    return (
        <mesh geometry={geometry} rotation={[-0.5 * Math.PI, 0, 0]}>
            <MaterialShader texture={texture} {...options} />
        </mesh>
    )

    
}

Terrain.defaultProps = {
    mapData: null,
}

export default Terrain