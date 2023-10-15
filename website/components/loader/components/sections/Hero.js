'use client'
import { motion } from "framer-motion";
import Pugachev from "./Pugachev";

import React from "react";

const HeroBackground = () => {
    return (<div className="absolute inset-0">
            <video className="h-full w-full object-cover" autoPlay={true} playsInline={true} loop muted preload="auto">
                <source src="/videos/introduction_video.mp4" type="video/mp4"/>
            </video>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-bg-dark to-transparent"/>
        </div>);
};
const Hero = () => {
    return (<motion.section className="relative z-10 flex h-[100vh] w-full justify-center" id="home" initial="initial" animate="animate">
            <HeroBackground />
            <div className="mt-10 flex flex-col items-center justify-center sm:mt-0">
                <div className={`relative flex flex-col items-center justify-center  pointer-events-none`}>
                    <Pugachev width={240} height={80}/>
                </div>
            </div>
        </motion.section>);
};
export default Hero;