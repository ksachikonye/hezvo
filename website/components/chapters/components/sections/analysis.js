'use client'
import React, { useState, useEffect, useRef, useContext } from "react";
import Lenis from '@studio-freight/lenis'
import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import * as d3 from "d3";
import { SmootherContext } from "src/helpers/SmootherContext.js";
import { useIsomorphicLayoutEffect } from "src/helpers/useIsomorphicLayoutEffect.js";

export default function Rankings() {
    const smoother = useContext(SmootherContext)
  const content = useRef()
  const wrapper = useRef()
    const listingsWrapper = useRef();
    const listing = useRef();
    const sectionFeaturedRef = useRef();
    const leftSectionRef = useRef();
    const rightSectionRef = useRef();
    const srollWrapperRef = useRef();
    const svgRef = useRef();
    const chartWrapper = useRef();
    const step1Ref = useRef();
    const step2Ref = useRef();
    const step3Ref = useRef();
    const step4Ref = useRef();
    const stepRef = useRef();

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    useEffect(() => {
        const lenis = new Lenis({
          wrapper: wrapper.current,
          content: content.current,
          duration: 1.2,
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
           
                const listings = gsap.utils.toArray(listing.current);
                //get the width of the listings wrapper
                let listingsWrapperWidth = listingsWrapper.current.offsetWidth;
    
                //get the total width of all the listings plus the gaps
                let listingsTotalWidth = (listings.length * listings[0].offsetWidth) + ((listings.length - 1) * 16);
                let test = listingsWrapperWidth - listingsTotalWidth;
    
                gsap.to(listing.current, {
                    x: test,
                    duration: 2,
                    scrollTrigger: {
                        trigger: sectionFeaturedRef.current,
                        start: 'top top',
                        end: '+=300%',
                        scrub: true,
                        pin: true,
                    }
                })
    
              
    
                gsap.set(rightSectionRef.current, {zIndex: (i, target, targets) => targets.length - i});
                gsap.set(leftSectionRef.current, {zIndex: (i, target, targets) => targets.length - i});
    
    
                const ts = gsap.timeline({
                    scrollTrigger: {
                        trigger: srollWrapperRef.current,
                        start: 'top top',
                        end: '+=300%',
                        scrub: true,
                        pin: true,
                    }
                });
                ts.to(leftSectionRef.current, {xPercent:-100, duration: 1.5, ease:'power4.inOut', stagger: 1 });
                ts.to(rightSectionRef.current, {xPercent:100, duration: 1.5, ease:'power4.inOut', stagger: 1}, "-=2");
    
    
            }, main)
            return () => ctx.revert()
    
        },[])
  
  
    const purple = '#854794';
      const blue = '#00A8DE';
      const green = '#54AE37';
      const yellow = '#FFDB00';
      const orange = '#F5A336';
      const red = '#E84750';
      const rainbow = [red, orange, yellow, green, blue, purple];
  
    const svgWidth = 700;
    const svgHeight = 500;
    const circleRad = 10;
  
    //draws chart
    useEffect(() => {
    
  
      const timeScaleTriggered = d3
      .scaleTime()
      .domain(d3.extent(data.features, d => d.properties.day))
      .range([circleRad, svgWidth - circleRad]);
  
    //set up SVG to fill wrapper
    const svg = d3
      .select(svgRef.current)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
  
    const g = svg.append('g');
    let circles = g
      .selectAll('circle')
      .data(data.features)
      .join('circle')
      .attr('class', 'points')
      .attr('r', 0)
      .attr('cx', () => Math.random() * svgWidth)
      .attr('cy', () => Math.random() * svgHeight)
      .style('fill', () => rainbow[Math.floor(Math.random() * rainbow.length)])
      .style('opacity', 0.7);
  
    //sets up the class toggle on each scrolling text box
    //so that it becomes opaque when in view and transparent when exiting
    gsap.utils.toArray(stepRef.current).forEach(step => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 80%',
        end: 'center top',
        toggleClass: 'active',
        markers: true,
        id: 'toggle-active-class'
      });
    });
  
    //The initial animation to show the points
    //sets the point radius to a random value from 0 to 20
    // use self.selector() to capture points
    gsap.to('.points', {
      scrollTrigger: {
        trigger: step1Ref.current,
        start: 'top center',
        toggleActions: 'play none none reverse',
        markers: true,
        id: 'first-box'
      },
      attr: {r: () => Math.random() * 20},
      duration: 0.5,
      ease: 'power3.out'
    });
  
    //the animation triggered by the second text box
    //shuffles the X position of the points to a random value
    gsap.to('.points', {
      scrollTrigger: {
        trigger: step2Ref.current,
        start: 'top center',
        toggleActions: 'play none none reverse',
        markers: true,
        id: 'second-box'
      },
      attr: {cx: () => Math.random() * svgWidth},
      duration: 0.5,
      ease: 'power3.inOut'
    });
  
    //the animation triggered by the third text box
    //this just sets up the scroll trigger, but the animation
    //is done using our D3 functions, passed as callbacks to onEnter and onLeaveBack
    ScrollTrigger.create({
      trigger: step3Ref.current,
      start: 'top center',
      onEnter: circlesToTimeline,
      onLeaveBack: circlesToRandom,
      markers: true,
      id: 'third-box'
    });
  
    //This pins the SVG chart wrapper when it hits the center of the viewport
    //and releases the pin when the final textbox meets the bottom of the chart
    //we use a function to define the end point to line up the bottom of the
    //text box with the bottom of the chart
    ScrollTrigger.create({
      trigger: chartWrapper.current,
      endTrigger: step4Ref.current,
      start: 'center center',
      end: () => {
        const height = window.innerHeight;
        const chartHeight = chartWrapper.current
          .offsetHeight;
        return `bottom ${chartHeight + (height - chartHeight) / 2}px`;
      },
      pin: true,
      pinSpacing: false,
      markers: true,
      id: 'chart-pin'
    });
  
  
  
    //our custom d3 functions that stack our circles
    //into a timeline dot plot
    function circlesToTimeline() {
      circles
        .transition()
        .duration(1000)
        .attr('r', circleRad)
        .attr('cx', d => timeScaleTriggered(d.properties.day))
        .attr('cy', d => svgHeight - d.properties.id_day * 20)
        .style('opacity', 1);
    }
    //reverses the circles back to a random position
    function circlesToRandom() {
      circles
        .transition()
        .attr('r', () => Math.random() * 20)
        .attr('cx', () => Math.random() * svgWidth)
        .attr('cy', () => Math.random() * svgHeight)
        .style('opacity', 0.7);
    }
  
  
      //drawing the line
      svg
        .selectAll(".line")
        .data([data])
        .join("path")
        .attr("class", "line")
        .attr("d", myLine)
        .attr("fill", "none")
        .attr("stroke", "#00bfa6");
    }, [data]);
  
    return (
      
  <>
  <div ref={wrapper}>
                    <div ref={content} >

                    <section className="box-border">
                              <div className=" px-4 py-32" ref={sectionFeaturedRef}>
                                  <div className="max-w-[1250px] mx-auto my-0">
                                      <div className="max-w-[clamp(300px,40vw,50ch)] mx-auto my-0">
                                          <h2 className="text-5xl">Featured Listings</h2>
                                          <p className="text-lg leading-[1.4]">Browse our current listings in the Lubbock area. We're sure the home you're looking for is out there!</p>
                                          <div className="no-underline text-white uppercase inline-block tracking-[1px] mt-10 px-7 py-4 rounded-[30px]">Find Your Home</div>
                                      </div>
                                      <div className="flex gap-4 mt-14" ref={listingsWrapper}>
                                          <div className="w-[clamp(275px,400px,90vw)] flex-[0_0_auto] aspect-[1/1]" ref={listing}>
                                              <div className="w-full h-full">
                                                  <img className="w-full h-full object-cover" src="https://images.pexels.com/photos/15253317/pexels-photo-15253317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
                                              </div>
                                          </div>
                                          <div className="w-[clamp(275px,400px,90vw)] flex-[0_0_auto] aspect-[1/1]" ref={listing}>
                                              <div className="w-full h-full">
                                                  <img className="w-full h-full object-cover" src="https://images.pexels.com/photos/10536106/pexels-photo-10536106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
                                              </div>
                                          </div>
                                          <div className="w-[clamp(275px,400px,90vw)] flex-[0_0_auto] aspect-[1/1]" ref={listing}>
                                              <div className="w-full h-full">
                                                  <img className="w-full h-full object-cover" src="https://images.pexels.com/photos/10536106/pexels-photo-10536106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
                                              </div>
                                          </div>
                                          <div className="w-[clamp(275px,400px,90vw)] flex-[0_0_auto] aspect-[1/1]" ref={listing}>
                                              <div className="w-full h-full">
                                                  <img className="w-full h-full object-cover" src="https://images.pexels.com/photos/13862328/pexels-photo-13862328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
                                              </div>
                                          </div>
                                          <div className="w-[clamp(275px,400px,90vw)] flex-[0_0_auto] aspect-[1/1]" ref={listing}>
                                              <div className="w-full h-full">
                                                  <img className="w-full h-full object-cover" src="https://images.pexels.com/photos/6204030/pexels-photo-6204030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
                                              </div>
                                          </div>
                                          <div className="w-[clamp(275px,400px,90vw)] flex-[0_0_auto] aspect-[1/1]" ref={listing}>
                                              <div className="w-full h-full">
                                                  <img className="w-full h-full object-cover" src="https://images.pexels.com/photos/15760049/pexels-photo-15760049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
                                              </div>
                                          </div>
                                          <div className="w-[clamp(275px,400px,90vw)] flex-[0_0_auto] aspect-[1/1]" ref={listing}>
                                              <div className="w-full h-full">
                                                  <img className="w-full h-full object-cover" src="https://images.pexels.com/photos/10844751/pexels-photo-10844751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              <div className="px-8 py-24">
                                  <div className="max-w-[1250px] mx-auto my-0">
                                      <p className="text-lg leading-[1.4]">Well excuse me, Judge Reinhold! Why are you squeezing me with your body? What, so the guy we are meeting with can't even grow his own hair? COME ON! Steve Holt? The moron jock? OH MY GOD, WE'RE HAVING A FIRE… sale. Oh, the burning! ♪♪ Amaaaaaaziiiing Graaaace ♪♪ Caw ca caw, caw ca caw, caw ca caw, caw ca caw. The worst that could happen is that I could spill coffee all over this $3,000 suit. COME ON.</p>
                                      <p className="text-lg leading-[1.4]">Stop it, stop it. This objectification of women has to stop. Michael: It's just Mom and whores. Look at us, crying like a couple of girls on the last day of camp. Her lawyers are claiming the seal is worth $250,000. And that's not even including Buster's Swatch. George Michael, you want to put your head down there by his drainage shunt? You are a worse psychiatrist than you are a son-in-law and you will never get work as an actor because you have no talent. Heart attack never stopped old big bear. Daddy horny, Michael. </p>
                                  </div>
                              </div>

                          <div className="w-screen h-screen" ref={srollWrapperRef}>
                              <div className="w-full h-full grid grid-cols-[1fr] grid-rows-[1fr_1fr] relative overflow-hidden lg:grid-cols-[1fr_1fr] lg:grid-rows-[1fr]">
                                  <div className="relative w-full col-[1/2] row-[1/2]" >
                                      <div className="absolute w-full h-full top-0 w-full h-[50vh] lg:h-screen" ref={leftSectionRef}>
                                          <img className="object-cover w-full h-full" src="https://source.unsplash.com/random/?clown" alt=""/>
                                      </div>
                                      <div className="absolute w-full h-full top-0 w-full h-[50vh] lg:h-screen" data-id="text2">
                                          <div className="max-w-[clamp(300px,40vw,50ch)] mx-auto my-0">
                                              <h2 className="text-5xl">This is a headline</h2>
                                              <p className="text-base leading-[1.4] mt-8">Well, Michael, I did not find their buffoonery amusing. I run a pretty tight ship around here. With a pool table. It's a gaming ship. You might enjoy this. Oh. Em. Gee. That's amazing.</p>

                                          </div>
                                      </div>
                                      <div className="absolute w-full h-full top-0 w-full h-[50vh] lg:h-screen" ref={leftSectionRef}>
                                          <img className="object-cover w-full h-full" src="https://source.unsplash.com/random/?small clown" alt=""/>
                                      </div>
                                  </div>
                                  <div className="relative w-full col-[1/2] row-[2/3] lg:col-[2/3] lg:row-[1/2]">
                                      <div className="absolute w-full h-full top-0 w-full h-[50vh] text-white flex flex-col justify-center p-[5vw] lg:h-screen" data-id="text1">
                                          <div className="max-w-[clamp(300px,40vw,50ch)] mx-auto my-0">
                                              <h2 className="text-5xl">This is a headline</h2>
                                              <p className="text-base leading-[1.4] mt-8">It walked on my pillow! The only thing I found in the fridge was a dead dove in a bag. Mom… after all these years, God's not going to take a call from you.</p>

                                          </div>
                                      </div>
                                      <div className="absolute w-full h-full top-0 scroller-image" ref={rightSectionRef}>
                                          <img className="object-cover w-full h-full" src="https://source.unsplash.com/random/?sad clown" alt=""/>
                                      </div>
                                      <div className="absolute w-full h-full top-0 w-full h-[50vh] text-white flex flex-col justify-center p-[5vw] lg:h-screen" data-id="text3"/>
                                      <div className="max-w-[clamp(300px,40vw,50ch)] mx-auto my-0">
                                          <h2 className="text-5xl">Coo coo ca chaw</h2>
                                          <p className="text-base leading-[1.4] mt-8">Mom always taught us to curl up in a ball and remain motionless when confronted. In the mid '90s, Tobias formed a folk music band with Lindsay and Maebe which he called Dr. Funke's 100 Percent Natural Good Time Family Band Solution.</p>

                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="px-8 py-24">
                              <div className="max-w-[1250px] mx-auto my-0">
                                  <p className="text-lg leading-[1.4]">Well excuse me, Judge Reinhold! Why are you squeezing me with your body? What, so the guy we are meeting with can't even grow his own hair? COME ON! Steve Holt? The moron jock? OH MY GOD, WE'RE HAVING A FIRE… sale. Oh, the burning! ♪♪ Amaaaaaaziiiing Graaaace ♪♪ Caw ca caw, caw ca caw, caw ca caw, caw ca caw. The worst that could happen is that I could spill coffee all over this $3,000 suit. COME ON.</p>
                                  <p className="text-lg leading-[1.4]">Stop it, stop it. This objectification of women has to stop. Michael: It's just Mom and whores. Look at us, crying like a couple of girls on the last day of camp. Her lawyers are claiming the seal is worth $250,000. And that's not even including Buster's Swatch. George Michael, you want to put your head down there by his drainage shunt? You are a worse psychiatrist than you are a son-in-law and you will never get work as an actor because you have no talent. Heart attack never stopped old big bear. Daddy horny, Michael. </p>
                              </div>
                        </div>
                


                        </section>


  <div className="h-full text-[22px] text-[rgba(0,0,0,0.8)] m-0">
  
      
  
      <p className="max-w-[700px] leading-[1.4em] mx-auto">
        GSAP is a JavaScript library that makes it easy to code high-performance
        and complex animations. GSAP has a flexible interface that is easy to use
        with D3 and other common dataviz libraries. GSAP has just released a new
        plugin called ScrollTrigger that facilitates scroll-driven animations.
        ScrollTrigger can be used along with GSAPs own animation functions, but
        you can also use it just as a scroll watcher to trigger any function (for
        example, run some D3 code) on a particular scroll interaction. This
        document showcases how you can use ScrollTrigger to power some common
        dataviz scrollytelling patterns, but the library is extremely
        full-featured and flexible, you can see more about  possible
        Oh, and if you want to see all the scroller and trigger markers for each scroll interaction in this demo, use the menu at the top right
      </p>
      <p><i>ScrollTrigger is very new, and hence I have had very little practice with it and I doubt it has even been used by anyone in a real dataviz project yet. That means  very few best practices at this point. What follows works for me, but it is subject to change, and I make no claims that this is the best or  way to do things.</i></p>
     
      <div ref={chartWrapper} className="w-3/5 border ml-[40%] border-solid border-[black]">
        <svg className="m-5" ref={svgRef}></svg>
      </div>
      <article id="scroll-steps">
        <section className="w-[30%] opacity-20 ml-[30px] mr-[70%] mb-[60vh] p-5 rounded-[20px] border-[5px] border-solid border-[purple]" ref={stepRef}>
          <div ref={step1Ref}>
               <p className="max-w-[700px] leading-[1.4em] mx-auto">
                GSAP is a JavaScript library that makes it easy to code high-performance
                and complex animations. GSAP has a flexible interface that is easy to use
                with D3 and other common dataviz libraries. GSAP has just released a new
                plugin called ScrollTrigger that facilitates scroll-driven animations.
                ScrollTrigger can be used along with GSAPs own animation functions, but
                you can also use it just as a scroll watcher to trigger any function (for
                example, run some D3 code) on a particular scroll interaction. This
                document showcases how you can use ScrollTrigger to power some common
                dataviz scrollytelling patterns, but the library is extremely
                full-featured and flexible, you can see more about  possible
                Oh, and if you want to see all the scroller and trigger markers for each scroll interaction in this demo, use the menu at the top right
              </p>
          </div>
   
  
        </section>
        <section className="w-[30%] opacity-20 ml-[30px] mr-[70%] mb-[60vh] p-5 rounded-[20px] border-[5px] border-solid border-[purple]" ref={stepRef}>
                <div ref={step2Ref}>
               <p className="max-w-[700px] leading-[1.4em] mx-auto">
                GSAP is a JavaScript library that makes it easy to code high-performance
                and complex animations. GSAP has a flexible interface that is easy to use
                with D3 and other common dataviz libraries. GSAP has just released a new
                plugin called ScrollTrigger that facilitates scroll-driven animations.
                ScrollTrigger can be used along with GSAPs own animation functions, but
                you can also use it just as a scroll watcher to trigger any function (for
                example, run some D3 code) on a particular scroll interaction. This
                document showcases how you can use ScrollTrigger to power some common
                dataviz scrollytelling patterns, but the library is extremely
                full-featured and flexible, you can see more about  possible
                Oh, and if you want to see all the scroller and trigger markers for each scroll interaction in this demo, use the menu at the top right
              </p>
          </div>
  
  
        </section>
        <section className="w-[30%] opacity-20 ml-[30px] mr-[70%] mb-[60vh] p-5 rounded-[20px] border-[5px] border-solid border-[purple]" ref={stepRef}>
             <div ref={step3Ref}>
               <p className="max-w-[700px] leading-[1.4em] mx-auto">
                GSAP is a JavaScript library that makes it easy to code high-performance
                and complex animations. GSAP has a flexible interface that is easy to use
                with D3 and other common dataviz libraries. GSAP has just released a new
                plugin called ScrollTrigger that facilitates scroll-driven animations.
                ScrollTrigger can be used along with GSAPs own animation functions, but
                you can also use it just as a scroll watcher to trigger any function (for
                example, run some D3 code) on a particular scroll interaction. This
                document showcases how you can use ScrollTrigger to power some common
                dataviz scrollytelling patterns, but the library is extremely
                full-featured and flexible, you can see more about  possible
                Oh, and if you want to see all the scroller and trigger markers for each scroll interaction in this demo, use the menu at the top right
              </p>
          </div>
  
        </section>
        <section className="w-[30%] opacity-20 ml-[30px] mr-[70%] mb-[60vh] p-5 rounded-[20px] border-[5px] border-solid border-[purple]" ref={stepRef}>
               <div ref={step4Ref}>
               <p className="max-w-[700px] leading-[1.4em] mx-auto">
                GSAP is a JavaScript library that makes it easy to code high-performance
                and complex animations. GSAP has a flexible interface that is easy to use
                with D3 and other common dataviz libraries. GSAP has just released a new
                plugin called ScrollTrigger that facilitates scroll-driven animations.
                ScrollTrigger can be used along with GSAPs own animation functions, but
                you can also use it just as a scroll watcher to trigger any function (for
                example, run some D3 code) on a particular scroll interaction. This
                document showcases how you can use ScrollTrigger to power some common
                dataviz scrollytelling patterns, but the library is extremely
                full-featured and flexible, you can see more about  possible
                Oh, and if you want to see all the scroller and trigger markers for each scroll interaction in this demo, use the menu at the top right
              </p>
          </div>
  
        </section>
      </article>
  
      <p className="max-w-[700px] leading-[1.4em] mx-auto">
        So far weve been animating SVG elements, but GSAP can animate components
        of basically any renderer: SVG, DOM, Canvas, or WebGL. And  built to
        work with popular libraries like pixi.js and three.js. try using
        it to animate some DOM elements, in this case a bunch of stacked text
        blocks. Well also show off another cool features of
        ScrollTrigger—scrubbing. In the examples above, the whole animation fired
        as soon as the trigger was activated, but you can also link the animation
        progress to the scroll progress, so that when youre scrolled 50 into an
        element, the animation.  You can also set scrub to a
        number, which will basically put a delay on the animation so that it
        catches up to the scroll position that many seconds later. Here weve
        stacked six text blocks, each colored differently, and set them to move
        down the page with a scrubbing animation. Each text block has a slight
        scrub delay (the purple text has almost no delay, and the red text has the
        longest delay), to demonstrate the  feature. The code looks like
        this:
  
      </p>
  
  
      </div>
      </div>
  </div>
  </>
      
    );
}