import { useEffect, useRef, useState } from 'react'
import { addEffect, Canvas, useFrame, useThree } from '@react-three/fiber'
import Image from './image'
import tunnel from 'tunnel-rat'
import Lenis from '@studio-freight/lenis'

export const webglTunnel = tunnel()

function ScrollCamera() {
  const { camera } = useThree()

  useFrame(() => {
    camera.position.y = -window.scrollY
  })
}

export function VerticalScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2
    })

    addEffect((time) => {
      lenis.raf(time)
    })
  }, [])

  return (
    <>
      <div id="webgl">
        <Canvas orthographic linear flat gl={{ alpha: true, antialias: true, stencil: false, depth: false }} dpr={[1, 2]}>
          <ScrollCamera />
          <webglTunnel.Out />
        </Canvas>
      </div>
      <div id="dom">
        <Image
          src="/1.jpg"
          style={{ position: 'absolute', top: `50vh`, left: '33vw', width: '33vw', height: '33vw', transform: `translate3d(-50%,-50%,0)` }}
        />
        <Image
          src="/2.jpg"
          style={{ position: 'absolute', top: `150vh`, left: '53vw', width: '20vw', height: '33vw', transform: `translate3d(-50%,-50%,0)` }}
        />
        <Image
          src="/3.jpg"
          style={{ position: 'absolute', top: `150vh`, left: '25vw', width: '33vw', height: '20vw', transform: `translate3d(-50%,-50%,0)` }}
        />
        <Image
          src="/4.jpg"
          style={{ position: 'absolute', top: `170vh`, left: '75vw', width: '20vw', height: '20vw', transform: `translate3d(-50%,-50%,0)` }}
        />
        <Image
          src="/5.jpg"
          style={{ position: 'absolute', top: `225vh`, left: '60vw', width: '20vw', height: '20vw', transform: `translate3d(-50%,-50%,0)` }}
        />
        <Image
          src="/6.jpg"
          style={{ position: 'absolute', top: `250vh`, left: '25vw', width: '33vw', height: '33vw', transform: `translate3d(-50%,-50%,0)` }}
        />
        <Image
          src="/7.jpg"
          style={{ position: 'absolute', top: `310vh`, left: '25vw', width: '33vw', height: '20vw', transform: `translate3d(-50%,-50%,0)` }}
        />
        <Image
          src="/8.jpg"
          style={{ position: 'absolute', top: `360vh`, left: '75vw', width: '50vw', height: '50vw', transform: `translate3d(-50%,-50%,0)` }}
        />
        <Image
          src="/12.jpg"
          style={{ position: 'absolute', top: `460vh`, left: '33vw', width: '40vw', height: '50vw', transform: `translate3d(-50%,-50%,0)` }}
        />
        <h1 style={{ position: 'absolute', top: `100vh`, right: '20vw', fontSize: '25em', transform: `translate3d(0,-100%,0)` }}>all</h1>
        <h1 style={{ position: 'absolute', top: '180vh', left: '10vw' }}>hail</h1>
        <h1 style={{ position: 'absolute', top: '260vh', right: '10vw' }}>thee,</h1>
        <h1 style={{ position: 'absolute', top: '350vh', left: '10vw' }}>thoth</h1>
        <h1 style={{ position: 'absolute', top: '450vh', right: '10vw' }}>
          her
          <br />
          mes.
        </h1>
      </div>
    </>
  )
}
