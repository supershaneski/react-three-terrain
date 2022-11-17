import React from 'react'

import { 
    PlaneGeometry, 
    //BoxGeometry, 
    DoubleSide, 
    //RepeatWrapping, 
    //TextureLoader, 
    //Float32BufferAttribute 
} from 'three'

import { 
    //Canvas, 
    //useLoader, 
    useFrame 
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

import { useSpring, animated, config } from '@react-spring/three'


const Sea = (props) => {

    const meshRef = React.useRef()
    
    const geometry = new PlaneGeometry( 50, 50, 200, 200 )
    const verts = geometry.attributes.position.array

    for(let i = 0; i < verts.length; i += 3) {
        verts[i + 2] += 0.07 * Math.random()
    }
    
    useFrame(({ clock }) => {
        
        meshRef.current.position.y += 0.0045 * Math.sin(clock.getElapsedTime())

    })

    const py = parseInt(props.level) * 0.5

    return (
        <mesh ref={meshRef} geometry={geometry} 
        rotation={[-0.5 * Math.PI, 0, 0]} 
        position={[0, py, 0]}>
            <meshPhongMaterial 
            //side={DoubleSide}
            shininess={100} 
            specular={0x050505} 
            color={0x002633} 
            opacity={0.4} 
            transparent 
            flatShading
            //envMap={envMap}
            />
        </mesh>
    )
}

export default Sea