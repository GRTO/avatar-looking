import { Particle } from "../canvasElements/Particle";

export function handleParticles(particlesArray: Array<Particle>, context: CanvasRenderingContext2D) {
	for (let i = 0; i < particlesArray.length; i++) {
		particlesArray[i].update();
		particlesArray[i].draw(context);

		for (let j = i; j < particlesArray.length; j++) {
			const dx = particlesArray[i].getX - particlesArray[j].getX;
			const dy = particlesArray[i].getY - particlesArray[j].getY;

			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < 100) {
				context.beginPath();
				context.strokeStyle = particlesArray[i].getColor;
				context.lineWidth = particlesArray[i].getSize / 10;
				context.moveTo(particlesArray[i].getX, particlesArray[i].getY);
				context.lineTo(particlesArray[j].getX, particlesArray[j].getY);
				context.stroke();
				context.closePath();
			}
		}

		if (particlesArray[i].getSize <= 0.3) {
			particlesArray.splice(i, 1);
			i--;
		}
	}
}

export function addParticles(particlesArray: Array<Particle>, mouseX: number, mouseY: number, hue: number): Array<Particle> {
	for (let i = 0; i < 5; i++) {
		particlesArray.push(new Particle(mouseX, mouseY, hue));
	}

	return particlesArray;
}

