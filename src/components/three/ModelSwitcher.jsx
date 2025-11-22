import React, { useRef } from 'react'
import { PresentationControls } from '@react-three/drei'
import Macbook16Model from '../models/Macbook-16'
import Macbook14Model from '../models/Macbook-14'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const ANIMATION_DURATION = 1
const OFFSET_DISTANCE = 5

const fadeMeshes = (group,opacity) => {
  if(!group) return;

  group.traverse((child) => {
    if(child.isMesh) {
      child.material.transparent = true;
      gsap.to(child.material,{
        duration:ANIMATION_DURATION,
        opacity:opacity,
      })
    }
  })
}

const moveGroup = (group , x) => {
  if(!group) return;

  gsap.to(group.position,{
    duration:ANIMATION_DURATION,
    x:x,
  })
}

const ModelSwitcher = ({scale, isMobile}) => {

  const smallMacbookRef = useRef()
  const largeMacbookRef = useRef()

  const showLargeMacbook = scale === 0.08 || scale === 0.05

  useGSAP(() => {

    if(showLargeMacbook){
      moveGroup(smallMacbookRef.current,-OFFSET_DISTANCE)
      moveGroup(largeMacbookRef.current,0)
      fadeMeshes(smallMacbookRef.current,0)
      fadeMeshes(largeMacbookRef.current,1)
    }else{
      moveGroup(smallMacbookRef.current,0)
      moveGroup(largeMacbookRef.current,OFFSET_DISTANCE)
      fadeMeshes(smallMacbookRef.current,1)
      fadeMeshes(largeMacbookRef.current,0)
    }
  },[scale])

  const controlConfig = {
    snap:true,
    speed:1,
    zoom:1,
    azimuth:[-Infinity, Infinity],
    config:{
      mass:1,tension:0,friction:26
    }
  }
  return (
    <>
      <PresentationControls {...controlConfig}>
        <group ref={largeMacbookRef}>
          <Macbook16Model scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>
      <PresentationControls {...controlConfig} enabled={!showLargeMacbook}>
        <group ref={smallMacbookRef}>
          <Macbook14Model scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  )
}

export default ModelSwitcher
