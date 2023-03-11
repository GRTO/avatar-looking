export class Particle {
	private x: number;
	private y: number;
	private size: number;
	private speedX: number;
	private speedY: number;
	private color: string;

	constructor(mouseX: number, mouseY: number, hue: number) {
		this.x = mouseX;
		this.y = mouseY;

		this.size = Math.random() * 15 + 1;
		this.speedX = Math.random() * 3 - 1.5;
		this.speedY = Math.random() * 3 - 1.5;
		this.color = `hsl(${hue}, 100%, 50%)`;
	}

	public update() {
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.size > 0.2) {
			this.size -= 0.1;
		}
	}

	public draw(context: CanvasRenderingContext2D) {
		context.fillStyle = this.color;

		context.beginPath();
		context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		context.fill();

	}

    public get getX(): number {
        return this.x;
    }

    public get getY(): number {
        return this.y;
    }

    public get getColor(): string {
        return this.color;
    }

    public get getSize(): number {
        return this.size;
    }
}
