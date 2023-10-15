import React , { useRef, useCallback, useEffect } from 'react'
import { ForceGraph2D, ForceGraph3D, ForceGraphVR, ForceGraphAR } from 'react-force-graph';

function FocusGraphs({url, ...props}) {
    const graphs = useRef();
    
    fetch('../datasets/miserables.json').then(res => res.json()).then(data => {
        const FocusGraph = () => {
          const fgRef = useRef();
  
          const handleClick = useCallback(node => {
            // Aim at node from outside it
            const distance = 40;
            const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
  
            fgRef.current.cameraPosition(
              { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
              node, // lookAt ({ x, y, z })
              3000  // ms transition duration
            );
          }, [fgRef]);
  
          return <ForceGraph3D
            ref={fgRef}
            graphData={data}
            nodeLabel="id"
            nodeAutoColorBy="group"
            onNodeClick={handleClick}
          />;
        };
  
  return (
     <div ref={graphs}>
         <FocusGraph />
         </div>
  )
      });
}