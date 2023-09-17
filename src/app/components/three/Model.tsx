import { useBounds, useGLTF } from '@react-three/drei'

import { useEffect } from 'react'

const Model = () => {
  const { scene: spaceScene } = useGLTF('/home/space.glb', true, true)

  const boundsApi = useBounds()

  useEffect(() => {
    addEventListener('mousemove', (e) => {
      boundsApi.to({
        position: [
          e.clientX * 0.0001,
          e.clientY * 0.0001,
          (e.clientX / e.clientY) * 0.0001,
        ],
        target: [
          e.clientX * 0.0001,
          e.clientY * 0.0001,
          (e.clientX / e.clientY) * 0.0001,
        ],
      })
    })

    addEventListener('mouseleave', (e) => {
      boundsApi.to({
        position: [0, 0, 0],
        target: [0, 0, 0],
      })
    })
    addEventListener('mouseenter', (e) => {
      boundsApi.to({
        position: [0, 0, 0],
        target: [0, 0, 0],
      })
    })

    addEventListener('mousedown', (e) => {
      boundsApi.fit()
    })
  }, [])

  return (
    <>
      <primitive object={spaceScene} />
    </>
  )
}

export default Model
