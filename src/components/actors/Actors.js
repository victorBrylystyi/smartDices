import { useGLTF } from "@react-three/drei";
import Planes from "./PhyPlane";
import Dices from "./Dices";
import { useRef } from "react";

useGLTF.preload("/assets/gltf/dice.glb");

const Actors = (props) => {

    const { d } = props;
    
    console.log('all actors');

    const { nodes } = useGLTF('/assets/gltf/dice.glb');

    return (
        <group>
            <Planes />
            <Dices node={nodes} d={d}/>
        </group>
    );
};

export default Actors;