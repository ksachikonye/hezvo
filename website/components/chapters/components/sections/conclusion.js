'use client'

import dynamic from 'next/dynamic'
import { useEffect,  useRef,  useContext} from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { SmootherContext } from "website/lib/SmootherContext.js";
import { useIsomorphicLayoutEffect } from "website/lib/useIsomorphicLayoutEffect.js";

export default function Conclusion({content, ...props}) {
  const smoother = useContext(SmootherContext);
  const content = useRef();
  const wrapper = useRef();
  const sectionsRef = useRef();
  const heroRef = useRef();
  const trackRef = useRef();
  const heroImageRef = useRef();
  const notePanelRef = useRef();
  const staggerPanelRef = useRef();
  const noteImageRef = useRef();
  const thanksPanelRef = useRef();
  const thanksImageRef = useRef();
  const thanksPanelWrapRef = useRef();
  const staggerPanelImageRef = useRef();
  const thanksPanelContainRef = useRef();


  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
    isTouch(isTouch)
  }, [])

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, ScrollSmoother);

 

  const lenis = useRef(null)

  const update = (time, deltaTime, frame) => {
    lenis.current.raf(time * 1000)
  }

  const resize = (e) => {
    ScrollTrigger.refresh()
  }

  useEffect(() => {

    lenis.current = new Lenis({
      wrapper: wrapper.current,
      content: content.current,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      lerp: 0.01,
    })

    lenis.current.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
      // console.log({ scroll, limit, velocity, direction, progress })
      ScrollTrigger.update()
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    gsap.ticker.add(update)

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.current.scroll = value
        }
        return lenis.current.scroll
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      }
    })

    ScrollTrigger.defaults({ scroller: document.body })

    window.addEventListener('resize', resize)

    // animations
    // animations




    // clean

    return () => {
      window.removeEventListener('resize', resize)
      gsap.ticker.remove(update)
      lenis.current.destroy()


    }

  }, [])


  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // create the smooth scroller FIRST!

      document.body.style.overflow = 'auto';
      document.scrollingElement.scrollTo(0, 0);
      ScrollSmoother.create({
        smooth: 3.6, // seconds it takes to "catch up" to native scroll position
        effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
        normalizeScroll: true, // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
        ignoreMobileResize: true, // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
        preventDefault: true
      
      });

      const tlMain = gsap.timeline(
        {
            scrollTrigger: {
              trigger: sectionsRef.current,
              start: "top top",
              end: "98% bottom",
              scrub: 1
            }
          }
      );
      tlMain.to(trackRef.current, {
        xPercent: -100,
        ease: "none"
      });

      const hero = gsap
      .timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          containerAnimation: tlMain,
          start: "left left",
          end: "right left",
          scrub: true
        }
      });
      hero.from(heroImageRef.current, { scale: 1.6 }, 0);

      const note = gsap
      .timeline({
        scrollTrigger: {
          trigger: notePanelRef.current,
          containerAnimation: tlMain,
          start: "left right",
          end: "left left",
          scrub: true
        }
      });
      note.from(noteImageRef.current, { rotate: 45, scale: 0.3 });

      const thanks = gsap.timeline(
        {
            scrollTrigger: {
              trigger: thanksPanelWrapRef.current,
              containerAnimation: tlMain,
              start: "left left",
              end: "right right",
              scrub: true
            }
          }
      );
      thanks.to(thanksPanelRef.current, { xPercent: 100, ease: "none" });
      thanks.to(thanksImageRef.current, { scale: 1 }, 0);
      thanks.fromTo(
        thanksPanelContainRef.current,
        {
          clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
        },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "none" },
        0
      );

      const stagger = gsap.timeline({
        scrollTrigger: {
          trigger: staggerPanelRef.current,
          containerAnimation: tlMain,
          start: "left right",
          end: "right left",
          scrub: true
        }
      });
      stagger.from(staggerPanelImageRef.current, { x: "100vw", stagger: { each: 0.05 } });
      stagger.to(staggerPanelImageRef.current, { scale: 0.5, stagger: { each: 0.05 } });




      

   

    }, wrapper);
    return () => ctx.revert();
  }, []);

  return (
    <>
    

                            <div className="hero">
                              <div className="relative z-[3] flex min-h-screen flex-col justify-center items-center bg-white text-center top-0 bottom-auto inset-x-0">
                                  <div className="max-w-full">
                                    <p className="text-[2.2em] leading-none font-normal mb-[0.6em]">PHOTOGRAPHER&#x27;S</p>
                                    <h1>CELEBRATION</h1>
                                    <div className="w-[26rem] max-w-full mx-auto pt-6">
                                        <p>TODAY WE WANT TO HONOR ALL THE PHOTOGRAPHERS WHO GENEROUSLY SHARE THEIR PICTURES WITH THE WORLD.THIS WEBSITE IS A CELEBRATION OF THEIR TALENT!</p>
                                    </div>
                                  </div>
                              </div>
                            </div>
                            <div className="relative h-[300vh]" ref={sectionRef}>
                              <div className=" sticky z-[2] flex overflow-hidden w-full h-screen justify-start items-stretch top-[0%] bottom-auto inset-x-[0%]">
                                  <div className="relative h-full flex-[0_0_auto] translate-x-[0%] translate-y-0">
                                    <div className="flex h-full mr-[-100vw] justify-start items-stretch">
                                        <div className="relative overflow-hidden w-screen h-screen flex-[0_0_auto]" ref={heroRef}>
                                          <div className="relative z-[2] flex w-[10vw] h-screen justify-start items-center" ref={heroImageRef} ></div>
                                        </div>
                                        <div className="relative z-[2] flex justify-center items-center flex-[0_0_auto] pl-[6vw]" ref={notePanelRef}>
                                          <div className="relative flex w-[25em] flex-col justify-center items-start">
                                              <div className="w-full mb-[2em]" ref={noteImageRef}>
                                                <div className="relative w-full  bg-[50%_50%] bg-cover bg-no-repeat pt-[100%]"></div>
                                              </div>
                                              <p><strong>DEAR PHOTOGRAPHERS,</strong>YOU ARE CELEBRATED TODAY IN THIS LITTLE VIRTUAL PHOTOGRAPHIC GALLERY.</p>
                                          </div>
                                        </div>
                                        <div className="relative z-[3] w-[200vw] h-screen flex-[0_0_auto]" ref={thanksPanelWrapRef}>
                                          <div className="relative z-[1] flex w-screen h-full justify-start items-start bg-white translate-x-[0%] translate-y-0" ref={thanksPanelRef}>
                                              <div className="relative z-[1] flex w-screen h-full justify-center items-center" ref={thanksPanelContainRef}>
                                                <p className="absolute text-[22em] leading-[0.9] font-normal tracking-[-0.04em] uppercase">Thanks</p>
                                                <div className="mt-[-20.3em] ml-[-46.5em] rotate-[14deg]" ref={thanksImageRef} >
                                                    <div className="relative overflow-hidden w-full pt-[120%]"><img src="https://assets.website-files.com/62fede6862a7714e740fe117/62fede6862a7714c110fe11f_thanks-1.c050f96d.webp" loading="eager" alt="" className="thanks-panel_photo"/></div>
                                                </div>
                                                <div className="-rotate-1 ml-[4.5em] mt-[18.9em]" ref={thanksImageRef}>
                                                    <div className="relative overflow-hidden w-full pt-[120%]"><img src="https://assets.website-files.com/62fede6862a7714e740fe117/62fede6862a7717fbd0fe120_thanks-2.5b322fb7.webp" loading="eager" alt="" className="thanks-panel_photo"/></div>
                                                </div>
                                                <div className="mt-[-22.3em] rotate-[-7deg] ml-[59em]" ref={thanksImageRef}>
                                                    <div className="relative overflow-hidden w-full pt-[120%]">
                                                      <img src="https://assets.website-files.com/62fede6862a7714e740fe117/62fede6862a7713d220fe123_thanks-3.48846b1e.webp" loading="eager" alt="" className="absolute w-full h-full object-cover scale-[1.4] inset-[0%]"/></div>
                                                </div>
                                              </div>
                                              <div className="-rotate-1 ml-[4.5em] mt-[18.9em]" ref={thanksPanelContainRef}>
                                                <p className="absolute text-[22em] leading-[0.9] font-normal tracking-[-0.04em] uppercase">Thanks</p>
                                                <div className="mt-[-20.8em] ml-[-18em]">
                                                    <div className="relative overflow-hidden w-full pt-[120%]"><img src="https://assets.website-files.com/62fede6862a7714e740fe117/62fede6862a77126a20fe11e_thanks-1bis.a9fa8549.webp" loading="eager" alt="" className="thanks-panel_photo"/></div>
                                                </div>
                                                <div className="-rotate-1 ml-[4.5em] mt-[18.9em]" ref={thanksImageRef}>
                                                    <div className="relative overflow-hidden w-full pt-[120%]"><img src="https://assets.website-files.com/62fede6862a7714e740fe117/62fede6862a77106330fe121_thanks-2bis.0afa6688.webp" loading="eager" alt="" className="thanks-panel_photo"/></div>
                                                </div>
                                                <div className="mt-[-22.3em] rotate-[-7deg] ml-[59em]" ref={thanksImageRef}>
                                                    <div className="relative overflow-hidden w-full pt-[120%]"><img src="https://assets.website-files.com/62fede6862a7714e740fe117/62fede6862a7711c030fe124_thanks-3bis.68c75dbb.webp" loading="eager" alt="" className="absolute w-full h-full object-cover scale-[1.4] inset-[0%]"/></div>
                                                </div>
                                              </div>
                                          </div>
                                        </div>
                                        <div className="relative flex overflow-hidden w-screen h-full justify-center items-center" ref={staggerPanelRef}>
                                          <div className="relative flex w-full h-full justify-center items-center flex-[0_0_auto]" ref={staggerPanelImageRef}>
                                              <img src="https://assets.website-files.com/62fede6862a7714e740fe117/62fef88ca3397df73ee9d7c8_groupe-centre2.24043a60.webp"  alt="" className="w-[14%] mt-[-35%] ml-[-47%]" ref={staggerPanelImageRef}/>
                                              <img src="https://assets.website-files.com/62fede6862a7714e740fe117/62fef88ccfa9a299aa252047_groupe-left3-v2.b32f9c0a.webp"  alt="" className="w-[27%] ml-[-8%] mt-[0%]" ref={staggerPanelImageRef}/>
                                              <img src="https://assets.website-files.com/62fede6862a7714e740fe117/62fef88c98d2a7a7a09cd7ce_groupe-right2.8c20aca0.webp"  alt="" className="w-1/5 mt-[-25%] ml-[48%]" ref={staggerPanelImageRef}/>
                                              <img src="https://assets.website-files.com/62fede6862a7714e740fe117/62fef88be39eba4ea16c2631_groupe-left2-v2.00b0dbc2.webp" alt="" className="w-[19%] ml-[-49%] mt-[23%]" ref={staggerPanelImageRef}/>
                                              <img src="https://assets.website-files.com/62fede6862a7714e740fe117/62fef88ba3397daa08e9d7c7_groupe-left1-v2.35b78d82.webp"  alt="" className="w-[14%] mt-[-4%] ml-[22%]" ref={staggerPanelImageRef}/></div>
                                        </div>
                                        <div className="flex w-screen h-full justify-start items-stretch"><img src="https://assets.website-files.com/62fede6862a7714e740fe117/62fefe269a0f21414c5674ba_sand3.4054f4f4.webp"   alt="" className="w-full object-cover"/></div>
                                    </div>
                                  </div>
                              </div>
                            </div>
                    
                  
                

    



  
   

      <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
        {/* jumbo */}
        <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
          <p className='w-full uppercase'>Next + React Three Fiber</p>
          <h1 className='my-4 text-5xl font-bold leading-tight'>Next 3D Starter</h1>
          <p className='mb-8 text-2xl leading-normal'>A minimalist starter for React, React-three-fiber and Threejs.</p>
        </div>

        <div className='w-full text-center md:w-3/5'>
          <View className='flex h-96 w-full flex-col items-center justify-center'>
            <Suspense fallback={null}>
              <Logo route='/blob' scale={0.6} position={[0, 0, 0]} />
              <Common />
            </Suspense>
          </View>
        </div>
      </div>

      <div className='mx-auto flex w-full flex-col flex-wrap items-center p-12 md:flex-row  lg:w-4/5'>
        {/* first row */}
        <div className='relative h-48 w-full py-6 sm:w-1/2 md:my-12 md:mb-40'>
          <h2 className='mb-3 text-3xl font-bold leading-none text-gray-800'>Events are propagated</h2>
          <p className='mb-8 text-gray-600'>Drag, scroll, pinch, and rotate the canvas to explore the 3D scene.</p>
        </div>
        <div className='relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40'>
          <View orbit className='relative h-full  sm:h-48 sm:w-full'>
            <Suspense fallback={null}>
              <Dog scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
              <Common color={'lightpink'} />
            </Suspense>
          </View>
        </div>
        {/* second row */}
        <div className='relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40'>
          <View orbit className='relative h-full animate-bounce sm:h-48 sm:w-full'>
            <Suspense fallback={null}>
              <Duck route='/blob' scale={2} position={[0, -1.6, 0]} />
              <Common color={'lightblue'} />
            </Suspense>
          </View>
        </div>
        <div className='w-full p-6 sm:w-1/2'>
          <h2 className='mb-3 text-3xl font-bold leading-none text-gray-800'>Dom and 3D are synchronized</h2>
          <p className='mb-8 text-gray-600'>
            3D Divs are renderer through the View component. It uses gl.scissor to cut the viewport into segments. You
            tie a view to a tracking div which then controls the position and bounds of the viewport. This allows you to
            have multiple views with a single, performant canvas. These views will follow their tracking elements,
            scroll along, resize, etc.
          </p>
        </div>
      </div>
    </>
  )
}
