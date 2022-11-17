react-three-terrain
==========

This React project is a simple `terrain map viewer` using [three.js](https://threejs.org), a cross-browser Javascript library to create/display 3D graphics in web browser, and bootstrapped using [Vite](https://https://vitejs.dev/guide/).

# Motivation

This is a coding exercise to explore `three.js`, making custom geometry, etc.

At first, I was thinking of making some `procedural terrain builder` but I cannot find any interesting function to generate `relief map` so I decided to make the terrain based on `2D image` instead.
It will be like a elevation viewer for data from a `geographic information system` (GIS).

# Application

I am using [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) as the React renderer for `three.js` and [@react-three/drei](https://github.com/pmndrs/drei) for helper components.

I use the pixel data from the 2D image to create the relief in 3D.
I extract it using the `canvas` API `getImageData`.

```javascript
const canvas = document.createElement('canvas')
canvas.width = img.naturalWidth
canvas.height = img.naturalHeight

const ctx = canvas.getContext('2d')

ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)

for(var y = 0; y < img.naturalHeight; y++){
    for(var x = 0; x < img.naturalWidth; x++){
        
        var pixeldata = ctx.getImageData(x, y, 1, 1).data
        // pixel data contains RGB data of the pixel

    }
}
```

By default, the relief height is calculated by `grayscale` value of each pixel.

```javascript
// grayscale value based on the luminance equation
const gs = (0.21 * pixeldata[0]) + (0.72 * pixeldata[1]) + (0.07 * pixeldata[2])

```

You can also customize the equation by changing the coefficients to get the desired relief height.

```javascript
const gs = (redCoeff) * pixeldata[0]) + (greenCoeff * pixeldata[1]) + (blueCoeff * pixeldata[2])
```

The images I used for the demo are located in the `public` directory so it is possible to add more or perhaps even allow upload from the user.

To get the best result, it is advisable to use `black and white` images.
The `black` represents the lowest level while `white` the highest level.
Sharp contrasts will become deep ridges so it is better to blur or soften the edges.
Adjust the resulting height using the `level` slider in `OPTIONS` panel to make the output visually appealing.

In `three.js`, I use `PlaneGeometry` to prepare the `mesh`, rotate it so that it will be flat on the ground and applied the relief values by editing the vertices.

```javascript
const geometry = new PlaneGeometry( 50, 50, width - 1, height - 1 )
const vert = geometry.attributes.position.array

const delta = (options.level - 50) / max

for (let i = 0; i < vert.length; i+=3) {

    let k = i / 3

    // z coordinate
    vert[i + 2] = delta * data[k].value

}
```

I am applying the relief values in the `z-coordinate` since, by default, the original plane is vertically standing.

Notice also that when I extract the relief values from the image, the outer loop is the `y-axis`.
This is important otherwise when you apply the image as color map later on, it may not coincide.

```javascript
let colorMap = useLoader(TextureLoader, `/${image}`)

return (
    <mesh rotation={[-0.5 * Math.PI, 0, 0]}>
        <planeGeometry args={[10, 10, 5, 5]} />
        <meshStandardMaterial color={0xffffff} map={colorMap} />
    </mesh>
)
```

In the future, I would like to use `vertexColors` to show the elevations just like in terrain maps.

# Setup

Clone the repository and install the dependencies

```sh
$ git clone https://github.com/supershaneski/react-three-terrain.git myproject

$ cd myproject

$ npm install

$ npm run dev
```

Open your browser to `http://localhost:5173/` to load the application page.
