import React from 'react'

const Attribute = ({ name, array, size }) => {
    return (
        <bufferAttribute
        attach={name}
        array={array}
        count={array.length / size}
        itemSize={size}
        />
    )
}

const Geometry = ({ attributes }) => {
    return (
        <bufferGeometry>
        {
            attributes.map((attr) => {
                return (
                    <Attribute 
                        key={attr.name}
                        name={attr.name} 
                        array={attr.items}
                        size={attr.size}
                    />
                )
            })
        }
        </bufferGeometry>
    )
}

const CustomBuffer = ({ children }) => <>{ children }</>

CustomBuffer.Geometry = Geometry

export default CustomBuffer