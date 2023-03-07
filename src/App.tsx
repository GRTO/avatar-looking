/* eslint-disable react/no-unknown-property */
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ResizeObserver } from '@juggle/resize-observer';
import './app.scss';
import Model from './components/Model';

const App: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 3], fov: 8 }}
      resize={{ polyfill: ResizeObserver }}
      style={{
        backgroundColor: '#111a21',
        width: '100vw',
        height: '100vh',
      }}
      data-testid="canvas-element"
    >
      <ambientLight intensity={1.25} />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={0.4} />
      <Suspense fallback={null}>
        <Model position={[0, -1.7, 0]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default App;
