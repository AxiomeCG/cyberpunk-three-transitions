import React, { RefObject, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Group, TextureLoader, Vector2 } from "three";
import gsap from "gsap";
import { EffectComposer, Glitch } from "@react-three/postprocessing";

function Config() {
  const state = useThree();
  state.camera.position.setZ(600);
  state.camera.far = 5000;
  state.camera.near = 1;

  return <></>;
}

function World(props: {setEffectParameters: (effectParameters:{glitchActive:boolean}) => void}) {

  const colorMap = useLoader(TextureLoader, "lucyBg.webp")
  const colorMap2 = useLoader(TextureLoader, "davidBg.webp")
  const alphaMap = useLoader(TextureLoader, "mask-modified.jpg")
  const group1: RefObject<Group> = useRef() as RefObject<Group>;
  const group2: RefObject<Group> = useRef() as RefObject<Group>;
  useFrame((state) => {
    const mouseTarget = state.pointer.clone();
    mouseTarget.lerp(state.mouse, 0.1);
    if (group1.current) {
      group1.current.rotation.x = -mouseTarget.y * 0.1
      group1.current.rotation.y = mouseTarget.x * 0.1
    }
    if (group2.current) {
      group2.current.rotation.x = -mouseTarget.y * 0.1
      group2.current.rotation.y = mouseTarget.x * 0.1
    }
  })
  const state = useThree();

  function onClickLucy() {

    const timeline = gsap.timeline();


    timeline
      .to(state.camera.position, {
        duration: 0.4,
        x: 1920,
        ease: "power4.inOut",
        onStart: () => {props.setEffectParameters({glitchActive: true});},
        onComplete: () => {props.setEffectParameters({glitchActive: false});}
      })
  }

  function onClickDavid() {
    gsap.to(state.camera.position, {
      duration: 0.6,
      x: 0,
      ease: "power4.inOut",
      onStart: () => {props.setEffectParameters({glitchActive: true});},
      onComplete: () => {props.setEffectParameters({glitchActive: false});}
    })
  }

  console.log(alphaMap)
  return <>
    <group ref={group1} position={[0, 0, 0]} onClick={onClickLucy}>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1920, 1080, 1, 1]}/>
        <meshBasicMaterial map={colorMap}/>
      </mesh>
      <mesh position={[0, 0, 75]}>
        <planeGeometry args={[1920, 1080, 1, 1]}/>
        <meshBasicMaterial map={colorMap} alphaMap={alphaMap} transparent={true} opacity={0.8}/>
      </mesh>
      <mesh position={[0, 0, 150]}>
        <planeGeometry args={[1920, 1080, 1, 1]}/>
        <meshBasicMaterial map={colorMap} alphaMap={alphaMap} transparent={true} opacity={0.8}/>
      </mesh>
      <mesh position={[0, 0, 225]}>
        <planeGeometry args={[1920, 1080, 1, 1]}/>
        <meshBasicMaterial map={colorMap} alphaMap={alphaMap} transparent={true} opacity={0.8}/>
      </mesh>

    </group>
    <group ref={group2} position={[1920, 0, 0]} onClick={onClickDavid}>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1920, 1080, 1, 1]}/>
        <meshBasicMaterial map={colorMap2}/>
      </mesh>
      <mesh position={[0, 0, 75]}>
        <planeGeometry args={[1920, 1080, 1, 1]}/>
        <meshBasicMaterial map={colorMap2} alphaMap={alphaMap} transparent={true} opacity={0.8}/>
      </mesh>
      <mesh position={[0, 0, 150]}>
        <planeGeometry args={[1920, 1080, 1, 1]}/>
        <meshBasicMaterial map={colorMap2} alphaMap={alphaMap} transparent={true} opacity={0.8}/>
      </mesh>
      <mesh position={[0, 0, 225]}>
        <planeGeometry args={[1920, 1080, 1, 1]}/>
        <meshBasicMaterial map={colorMap2} alphaMap={alphaMap} transparent={true} opacity={0.8}/>
      </mesh>
    </group>
  </>;
}

const BackgroundTransition = () => {
  const [effectParameters, setEffectParameters] = useState({
    glitchActive: true
  })
  return (
    <Canvas>
      <Config/>
      <World setEffectParameters={setEffectParameters}/>
      <EffectComposer>
        <Glitch active={effectParameters.glitchActive} delay={new Vector2(0,0)} mode={3}></Glitch>
      </EffectComposer>
    </Canvas>

  );
}

export default BackgroundTransition;
