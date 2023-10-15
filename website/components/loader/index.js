"use client";
import React, { useState } from "react";
import Bolt from "./components/sections/Bolt";
import Loading from "./components/sections/Loading";
import Hero from "./components/sectionss/Hero";
import About from "./components/sections/About";

export default function Home() {
    
    return (<>
            <Loading />
        
            {/*<ScrollerMotion // Weird, stuff happening with this
            disabled={isMobile}
            spring={{ mass: 1, stiffness:800, bounce: 300, damping: 100 }}
        >*/}
            <main className="flex flex-col items-center justify-center bg-black">
                <Hero />
                <About />
                <Bolt />
            </main>
            {/*</ScrollerMotion>*/}
        </>);
}
