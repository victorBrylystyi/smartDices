import { usePlane } from "@react-three/cannon";
import { Plane } from '@react-three/drei';
import ReflectionPlane from "./ReflectionPlane";

const PhyPlane = ({color, dim, ...props}) => {

  const [ref] = usePlane(() => ({...props}));
  
  return (
    <Plane ref={ref} args={dim} >
      <meshStandardMaterial color={color} metalness={1} roughness={0.3} />
    </Plane>
  );
};

const Planes = (props) => {
  console.log('static planes');
  const {floor, normal} = props;
  return (
      <group>
          <ReflectionPlane roughnessMap={floor} normalMap={normal} dim={[20,20]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} /> 
          <PhyPlane color= "slateBlue" dim={[20,10]} position={[0, 5, -10]} />
          <PhyPlane color= "limeGreen" dim={[20,10]} position={[10, 5, 0]} rotation={[0, -Math.PI / 2, 0]}/>
          <PhyPlane color= "red" dim={[20,10]} position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]}/>
          <PhyPlane color= "darkBlue" dim={[20,10]} position={[0, 5, 10]} rotation={[0, Math.PI , 0]}/>
      </group>
  );
};

export default Planes;