import { useGLTF, useTexture } from "@react-three/drei";
import Planes from "./PhyPlane";
import Dices from "./Dices";

useGLTF.preload("/assets/gltf/dice.glb");
useTexture.preload(['/assets/ground/ground.jpeg', '/assets/ground/ground_normal.jpeg']);

const Actors = (props) => {

    const { d } = props;
    
    console.log('all actors');

    const { nodes } = useGLTF('/assets/gltf/dice.glb');
    const [ floor, normal ] = useTexture(['/assets/ground/ground.jpeg', '/assets/ground/ground_normal.jpeg']);

    return (
        <group>
            <Planes floor={floor} normal={normal} />
            <Dices node={nodes} d={d}/>
        </group>
    );
};

export default Actors;