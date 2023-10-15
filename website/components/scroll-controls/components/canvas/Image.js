import { useCallback, useEffect, useId, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'
import { webglTunnel } from './index'
// import { TextureLoader } from 'three'
import { useWindowSize, useIntersection } from 'react-use'
import { Image as DreiImage } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function WebglImage({ src, visible = false, hovered = false, scale }) {
  const ref = useRef()

  const { height: windowHeight } = useThree((state) => state.viewport)

  useFrame((state, delta) => {
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, visible ? 0 : -windowHeight / 2 + 1, 4, delta)
    ref.current.material.zoom = THREE.MathUtils.damp(ref.current.material.zoom, visible ? 1 : 1.5, 4, delta)
    ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, hovered ? 0 : 1, 4, delta)
    ref.current.material.opacity = THREE.MathUtils.damp(ref.current.material.opacity, visible ? 1 : 0, 4, delta)
  })

  return <DreiImage ref={ref} url={src} scale={scale} visible={visible} transparent />
}

export default function Image({ src, style, alt = '', ...props }) {
  const [measureRef, { width, height, top, left }] = useMeasure()
  const intersectionRef = useRef()
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0
  })

  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const [scrollY, setScrollY] = useState()

  useEffect(() => {
    setScrollY(window.scrollY)
  }, [windowWidth, windowHeight])

  const [hovered, setHovered] = useState(false)

  const id = useId()

  const [currentSrc, setCurrentSrc] = useState()

  return (
    <>
      <img
        src={src}
        alt={alt}
        {...props}
        ref={(node) => {
          measureRef(node)
          intersectionRef.current = node
        }}
        style={{ ...style, opacity: 0 }}
        onPointerEnter={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onLoad={({ target }) => {
          setCurrentSrc(target.currentSrc)
        }}
      />
      <webglTunnel.In>
        <group position={[-windowWidth / 2, windowHeight / 2, 0]} key={id}>
          <group position={[left + width / 2, -top - height / 2 - scrollY, 0]}>
            {currentSrc && (
              <WebglImage src={currentSrc} scale={[width, height, 0]} visible={intersection?.isIntersecting} hovered={hovered} />
            )}
          </group>
        </group>
      </webglTunnel.In>
    </>
  )
}
