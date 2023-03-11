/* eslint-disable react/no-unknown-property */
import { Suspense, useRef, useState, MouseEvent } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ResizeObserver } from '@juggle/resize-observer';
import './app.scss';
import { Model } from './components/Model';
import { Sparkles } from './components/Sparkles';
import { useRefDimensions } from './hooks/useDimensions';

const App: React.FC = () => {
	const [mousePosition, setMousePosition] = useState<{x: number; y: number;}>({ x: 0, y: 0 });
	const containerRef = useRef<HTMLDivElement>(null);

	const { height, width } = useRefDimensions(containerRef);

	const handleOnMouseMove = (event: MouseEvent<HTMLDivElement>) => {
		const { clientX, clientY } = event;
		setMousePosition({ x: clientX, y: clientY });
	}

	return (
		<div 
			ref={containerRef}
			style={{
			height: "100vh",
			width: "100vw",
			position: "relative",
			}}
				onMouseMove={handleOnMouseMove}
			>
			<Canvas
				camera={{ position: [0, 0.5, 3], fov: 9 }}
				resize={{ polyfill: ResizeObserver }}
				style={{
					backgroundColor: '#111a21',
					width: '100vw',
					height: '100vh',
					position: "absolute",
					top: 0,
					left: 0,
				}}
				data-testid="canvas-element"
			>
				<ambientLight intensity={1.25} />
				<ambientLight intensity={0.1} />
				<directionalLight intensity={0.4} />
				<Suspense fallback={null}>
					<Model
            position={[0, -1.7, 0]}
            mousePosition={mousePosition}
            height={height}
            width={width}
          />
				</Suspense>
				<OrbitControls />
			</Canvas>
			<Sparkles height={height} width={width} mousePosition={mousePosition} />
		</div>
	);
};

export default App;
