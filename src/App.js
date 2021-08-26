
import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, CameraShake} from '@react-three/drei';
import { Physics } from "@react-three/cannon";
import SideMenu from "./components/menu/SideMenu";
import Actors from "./components/actors/Actors";
import store from "./redux";
import { Provider } from "react-redux";
import React from "react";
import Composer from "./components/Composer";

const Scene = (props) => {

  const { d } = props;

  console.log('scene');
  
  return (
    <div className='App'>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 2, 5] }}>
        <Provider store={store}>
          <color attach="background" args={0x010620} />  //0e1538
          <ambientLight intensity={0.8} />
          <pointLight intensity={1} position={[0,16,0]}/>
          <OrbitControls />
          <Suspense fallback={null}>
            <Physics gravity={[0, -9.81, 0]}>
              <Actors d={d} />
            </Physics>
          </Suspense>
        </Provider>
      </Canvas>
    </div>
  );
};

const App = () => {

  console.log('app');

  const dicesRef = useRef(null); 

  return (
    <div id='appContainer'>
      <Scene d = {dicesRef}/>
      <SideMenu d = {dicesRef}/>
    </div>
  );
};

export default App;

