'use client'
import React, { cloneElement } from "react";
import Animated from "./Animated"; // Replace with the correct path to the "Animated" component
const AnimatedTools = ({ delay, stepSize, children, iconSize, className, }) => {
    return (<div className={className}>
            {children.map((child, index) => (<Animated key={index} delay={delay + index * stepSize}>
                    {cloneElement(child, { size: iconSize })}
                </Animated>))}
        </div>);
};
export default AnimatedTools;
