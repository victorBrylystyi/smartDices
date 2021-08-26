
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const Composer = () => {

    return (
        <EffectComposer multisampling={1}>
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.1} intensity={1.5} width={1024} height={1024} kernelSize={3} /> 
        </EffectComposer>
    );
};


export default Composer;