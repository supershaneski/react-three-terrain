import React from 'react'

/*import { 
    PlaneGeometry, 
    BoxGeometry, 
    DoubleSide, 
    RepeatWrapping, 
    TextureLoader, 
    Float32BufferAttribute 
} from 'three'*/

import { 
    Canvas, 
    //useLoader, 
    //useFrame 
} from '@react-three/fiber'

import { 
    //Sky, 
    OrbitControls, 
    MapControls,
    ArcballControls,
    //DeviceOrientationControls,
    //Text, 
    //Text3D, 
    //useTexture,
    //Clone,
    //Billboard,
} from '@react-three/drei'

const Three = ({ children }) => <>{ children }</>

const Stage = (props) => {

    const NavControl = () => props.naviMode === 1 ? <MapControls /> : props.naviMode === 2 ? <ArcballControls enablePan={true} enableRotate={true} enableZoom={true} /> : <OrbitControls />

    // bottom light to shine on sea
    //<directionalLight position={[0, -2, 0]} rotation={[-0.5 * Math.PI, 0, 0]} intensity={1.5} />
            
    return (
        <Canvas camera={{ fov: 70, position: [10, 25, 60]}}>
            <NavControl />
            <ambientLight args={[0xffffff]} intensity={0.3} />
            <directionalLight position={[0, 2, 0]} rotation={[1.2 * Math.PI, 0, 0]} intensity={2.1} />
            <directionalLight position={[0, 0, -5]} rotation={[0, 0.75 * Math.PI, 0]} intensity={0.8} />
            <directionalLight position={[0, 0, 5]} rotation={[0, -0.75 * Math.PI, 0]} intensity={0.6} />
            {
                props.children
            }
        </Canvas>
    )
}

Three.Stage = Stage

export default Three