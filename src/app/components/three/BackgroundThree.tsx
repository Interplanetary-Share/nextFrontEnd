import { Bounds, OrbitControls, Stage } from '@react-three/drei'

import { Canvas } from '@react-three/fiber'
import Model from './Model'

const BackgroundThree = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
      }}
    >
      <Canvas>
        <Bounds fit clip observe margin={0.4}>
          <Model />
        </Bounds>
        <OrbitControls
          makeDefault
          position={[0, 0, 0]}
          target={[0, 0, 0]}
          autoRotate={true}
          autoRotateSpeed={0.5}
          zoomToCursor={true}
          enablePan={false}
          enableZoom={false}
          enableDamping
        />
        <Stage adjustCamera={false} />
      </Canvas>
    </div>
  )
}

export default BackgroundThree
