
import { useBox } from "@react-three/cannon";
import { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import * as THREE from 'three';
import { getRandomIntInclusive } from "../../utils";

const PhysDice = ({model,vec,color,name,...props}) => {

    const [ref, api] = useBox(() => ({ ...props }));

    const cloneMaterial = useMemo(()=>{

        const material = model?.mainBox?.material.clone();
        material.roughness = 0.1;
        material?.color.copy(new THREE.Color(color));

        return material;
        
    },[model]);

    useEffect(()=>{
        model.perforatedBox.material.roughness = 0.1;
        model.perforatedBox.material.metalness = 1;
    },[])

    useEffect(()=>{
        cloneMaterial.color.copy(new THREE.Color(color));
    },[color]);

    return ( 
        <group 
            scale = {0.043}
            ref={ref} 
            api={api} 
            onClick={() => api.applyImpulse([vec.x, vec.y, vec.z], [0, 0, 0]) }
            name = {name}
            >
            <mesh 
                geometry={model.mainBox.geometry} 
                material={cloneMaterial} 
            />
            <mesh 
                geometry={model.perforatedBox.geometry} 
                material={model.perforatedBox.material}
            />
         </group>
    ); 
};

const Dices = (props) => {

    console.log('dynamic dices');

    const { node, value, d } = props;

    const toRotation = (quat)=>{

        if (!quat) return [0,0,0];

        const rot = new THREE.Euler( 'XYZ' )
        .setFromQuaternion(new THREE.Quaternion(quat[0],quat[1],quat[2],quat[3]),'XYZ')
        .toVector3();

        return [rot.x,rot.y,rot.z];
    };
    
    const dices = value.map(
        ( item ) => {
            return (
                <PhysDice 
                    key={item.id} 
                    model= {node} 
                    vec={{
                        x:getRandomIntInclusive(-7,7),
                        y:getRandomIntInclusive(0,5),
                        z:getRandomIntInclusive(-7,7)
                    }} 
                    color={item.color} 
                    args={[1,1,1]} 
                    name= {item.id}
                    mass= {1} 
                    position={ item.position || [2, 1, 0]}
                    rotation={ toRotation(item.quaternion) }
                />
            );
        }
    );

    return (
        <group ref={d}>
            { dices }
        </group>
    );
};

const mapStateToProps = (state) => {

    const { present } = state;

    return {
        value: present
    };
};


export default connect(mapStateToProps)(Dices);
