import React, { useEffect, useRef, useState } from "react";
import { Particle } from "../canvasElements/Particle";
import { addParticles, handleParticles } from "../utils/particles.utils";

const animation = (
    ctx: CanvasRenderingContext2D,
    particles: Array<Particle>,
    width: number,
    height: number,
    hueColor: number,
    updateHueColor: (_value: React.SetStateAction<number>) => void,
) => {
    /* Add transparent background */
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "rgba(255, 0, 0, 0)";
	ctx.fillRect(0, 0, width, height);

	handleParticles(particles, ctx);

    updateHueColor(hueColor + 1);

	requestAnimationFrame(() => animation(ctx, particles, width, height, hueColor + 1, updateHueColor ));
}

export type SparklesProps = {
    height: number;
    width: number;
    mousePosition: {
        x: number;
        y: number;
    };
};

export const Sparkles: React.FC<SparklesProps> = ({ height, width, mousePosition }) => {
	const [hueColor, setHueColor] = useState<number>(0);
    const [particles, setParticles] = useState<Array<Particle>>([]);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext("2d");
            // Very Important !!
            canvas.height = height;
            canvas.width = width;

			if (context) {
				animation(context, particles, width, height, hueColor, setHueColor);
			}
		}
	}, [canvasRef.current]);

    useEffect(() => {
        const newParticles = addParticles(particles, mousePosition.x, mousePosition.y, hueColor);
        setParticles(newParticles);
    }, [mousePosition.x, mousePosition.y]);

	return (
        <canvas
            style={{ position: "absolute", top: 0, left: 0, width, height }}
            ref={canvasRef}
        />
    );
}
