'use client'
import Lenis from '@studio-freight/lenis'
import Image from 'next/image'
import { useEffect,  useRef,  useContext} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { SmootherContext } from "src/helpers/SmootherContext.js";
import { useIsomorphicLayoutEffect } from "src/helpers/useIsomorphicLayoutEffect.js";

const state = {
  top: 0,
  progress: 0,
}

const { damp } = THREE.MathUtils



export default function Discussion({content, ...props}) {
  const smoother = useContext(SmootherContext)
  const content = useRef();
  const wrapper = useRef();
  const stickyTrackRef = useRef();
  const stickyElRef = useRef();


  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
  useEffect(() => {
    const lenis = new Lenis({
      wrapper: wrapper.current,
      content: content.current,
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenis.on('scroll', ({ scroll, progress }) => {
      state.top = scroll
      state.progress = progress
    })
    const effectSub = addEffect((time) => lenis.raf(time))
    return () => {
      effectSub()
      lenis.destroy()
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {


        ScrollSmoother.create({
          smooth: 3.6, // seconds it takes to "catch up" to native scroll position
          effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
          normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
          ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
          preventDefault: true
        
        });
    

        const stickyTrack = gsap.utils.toArray(stickyTrackRef.current);
        const stickyEl = gsap.utils.toArray(stickyElRef.current);
      
        for (let i = 0; i < stickyEl.length; i++) {
          ScrollTrigger.create({
            markers: false,
            trigger: stickyEl[i],
            pin: stickyEl[i],
            start: () => `top top`,
            end: () => `bottom top`,
            pinSpacing: false
          });
        }



        }, main)
        return () => ctx.revert()

    },[])
            

   


 
  return (

              <>
             <div ref={wrapper} className='box-border'>
                    <div ref={content} >

                 

                                    <section className="max-w-screen-lg mx-auto my-0 px-[2em] py-[8em]">
                                        <article>
                                            <header className="z-[2] col-[1_/_4]" data-speed="1.25">
                                            <h2 >Våg å lytte,  våg å skifte mening</h2>
                                            <p>Jerky pastrami strip steak pork chuck. Biltong boudin burgdoggen shankle, short ribs short loin drumstick corned beef rump ribeye filet mignon pork chop. </p>
                                            </header>
                                            
                                            <div className="relative flex justify-center items-center col-[2_/_-1]">
                                            <div className="image-parent">
                                                <img className="block max-w-full h-[180%] object-cover opacity-60" data-speed="auto" src="https://images.unsplash.com/photo-1583430999185-4c19b0c9636a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80" alt="" />
                                            </div>
                                            
                                    
                                            
                                        </div>
                                    </article>
                                </section>

                                     <section class="mb-32 text-[rgba(255,255,255,0.5)] leading-[1.7] m-0">
                                            <section className="stickyTrack" ref={stickyTrackRef}>
                                                  <div className="max-w-[900px] columns-2 gap-12">
                                                    <div className="overflow-hidden rounded-lg">
                                                      <img className="max-w-full h-auto object-cover scale-[130%]" data-speed="auto" src="https://itsmil.es/media/placeholder_11.jpg"/>
                                                      <View className='flex h-96 w-full flex-col items-center justify-center'>
                                                          <Suspense fallback={null}>
                                                            <Logo route='/blob' scale={0.6} position={[0, 0, 0]} />
                                                            <Common />
                                                          </Suspense>
                                                        </View>
                                                    </div>
                                                    <div  ref={stickyElRef}>
                                                      <h1 className='leading-[1.1] mt-0 mb-[0.4em] mx-0'>GSAP Pinning</h1>
                                                      <p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptates quos ullam unde dicta quas, facere nobis architecto accusamus, delectus, veritatis adipisci perferendis repellat? Labore repellendus minima dolore illum obcaecati.</p>
                                                    </div>
                                                  </div>
                                          </section>
                                            <section className=" h-[calc(100vh_-_5px)]" ref={stickyTrackRef}>
                                                      <div className="max-w-[900px]">
                                                        <div className="stickyEl" ref={stickyElRef}>
                                                          <h1 className='leading-[1.1] mt-0 mb-[0.4em] mx-0'>GSAP Pinning</h1>
                                                          <p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptates quos ullam unde dicta quas, facere nobis architecto accusamus, delectus, veritatis adipisci perferendis repellat? Labore repellendus minima dolore illum obcaecati.</p>
                                                        </div>
                                                      </div>
                                            </section>
                                            <section className="stickyTrack" ref={stickyTrackRef}>
                                                        <div className="max-w-[900px] columns-2 gap-12">
                                                            <div className="stickyEl" ref={stickyElRef}>
                                                            <div className="h-[16vw] w-[16vw] bg-[rgba(255,255,255,0.2)]"></div>
                                                            </div>
                                                            <div className="overflow-hidden rounded-lg">
                                                            <img className="max-w-full h-auto object-cover scale-[130%]" data-speed="auto" src="https://itsmil.es/media/placeholder_13.jpg"/>
                                                            </div>
                                                        </div>
                                            </section>
                                            <section className="h-[calc(100vh_-_5px)]" ref={stickyTrackRef}>
                                                    <div className="max-w-[900px] margin-inline-start:auto margin-inline-end:auto padding-inline-start: 1.25rem padding-inline-end: 1.25rem">
                                                        <div  ref={stickyElRef}>
                                                        <h1 className='leading-[1.1] mt-0 mb-[0.4em] mx-0'>GSAP Pinning</h1>
                                                        <p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptates quos ullam unde dicta quas, facere nobis architecto accusamus, delectus, veritatis adipisci perferendis repellat? Labore repellendus minima dolore illum obcaecati. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptates quos ullam unde dicta quas, facere nobis architecto accusamus, delectus, veritatis adipisci perferendis repellat? Labore repellendus minima dolore illum obcaecati.</p>
                                                        </div>
                                                    </div>
                                            </section>
                                            <section  ref={stickyTrackRef}>
                                                        <div className="max-w-[900px] margin-inline-start:auto margin-inline-end:auto padding-inline-start: 1.25rem padding-inline-end: 1.25rem columns-2 gap-12">
                                                          <div className="overflow-hidden rounded-lg">
                                                            <img className="max-w-full h-auto object-cover scale-[130%]" data-speed="auto" src="https://itsmil.es/media/placeholder_10.jpg"/>
                                                          </div>
                                                          <div  ref={stickyElRef}>
                                                            <h1 className='leading-[1.1] mt-0 mb-[0.4em] mx-0'>GSAP Pinning</h1>
                                                            <p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptates quos ullam unde dicta quas, facere nobis architecto accusamus, delectus, veritatis adipisci perferendis repellat? Labore repellendus minima dolore illum obcaecati.</p>
                                                          </div>
                                                        </div>
                                            </section>
                                            <section className="h-[calc(100vh_-_var(--siteHeader-height))]" ref={stickyTrackRef}>
                                                <div className="max-w-[900px] margin-inline-start:auto margin-inline-end:auto padding-inline-start: 1.25rem padding-inline-end: 1.25rem  ">
                                                    <div  ref={stickyElRef}>
                                                    <h1 className='leading-[1.1] mt-0 mb-[0.4em] mx-0'>GSAP Pinning</h1>
                                                    <p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptates quos ullam unde dicta quas, facere nobis architecto accusamus, delectus, veritatis adipisci perferendis repellat? Labore repellendus minima dolore illum obcaecati. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptates quos ullam unde dicta quas, facere nobis architecto accusamus, delectus, veritatis adipisci perferendis repellat? Labore repellendus minima dolore illum obcaecati.</p>
                                                    </div>
                                                </div>
                                        </section>
                                                

                              </section>

                            
                      

                  


                          
                  </div>
              </div>
     

                   </>
  )
}

export const ScrollTicker = ({ smooth = 9999999 }) => {
  useFrame(({ viewport, camera }, delta) => {
    camera.position.y = damp(camera.position.y, -state.progress * viewport.height, smooth, delta)
  })

  return null
}