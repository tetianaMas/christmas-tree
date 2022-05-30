import { ISnowFlake, ISnowManager } from './interfaces';

const SNOWFLAKES_AMOUNT = 100;

export default class SnowManager implements ISnowManager {
  private canvas: HTMLCanvasElement | null;

  private ctx: CanvasRenderingContext2D | null;

  private wrapper: Element | null;

  private snowFlakesData: ISnowFlake[];

  private intervalId: ReturnType<typeof setInterval> | null;

  constructor() {
    this.canvas = null;
    this.snowFlakesData = [];
    this.intervalId = null;
    this.wrapper = null;
    this.ctx = null;
    window.addEventListener('resize', this.resizeCanvas.bind(this));
  }

  public init(elem: Element): void {
    this.wrapper = elem;
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.canvas.width = this.wrapper.clientWidth;
    this.canvas.height = this.wrapper.clientHeight;
    this.ctx = this.canvas.getContext('2d');
    if (this.ctx) {
      this.showSnow();
    }
  }

  public showSnow(): void {
    this.canvas?.classList.remove('hidden');

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => this.updateSnowFall(), 50);
    this.createSnowFlakes();
  }

  public hideSnow(): void {
    this.canvas?.classList.add('hidden');
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private random(min: number, max: number): number {
    return min + Math.random() * (max - min + 1);
  }

  private resizeCanvas(): void {
    if (this.wrapper && this.canvas) {
      this.canvas.width = this.wrapper.clientWidth;
      this.canvas.height = this.wrapper.clientHeight;
    }
  }

  private createSnowFlakes(): void {
    let snowFlakesAmount = SNOWFLAKES_AMOUNT;

    while (snowFlakesAmount > 0) {
      if (this.canvas) {
        const snowFlakeData: ISnowFlake = {
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          opacity: Math.random(),
          speedX: this.random(-11, 11),
          speedY: this.random(7, 15),
          radius: this.random(0.5, 4.2),
        };
        this.snowFlakesData.push(snowFlakeData);
      }

      snowFlakesAmount -= 1;
    }
  }

  private drawSnowFlakes(): void {
    if (this.canvas) {
      const ctx = this.canvas.getContext('2d');
      if (ctx)
        this.snowFlakesData.forEach((snowflake: ISnowFlake): void => {
          const gradient = ctx.createRadialGradient(
            snowflake.x,
            snowflake.y,
            0,
            snowflake.x,
            snowflake.y,
            snowflake.radius
          );

          gradient.addColorStop(0, 'rgba(255, 255, 255,' + snowflake.opacity + ')');
          gradient.addColorStop(0.8, 'rgba(210, 236, 242,' + snowflake.opacity + ')');
          gradient.addColorStop(1, 'rgba(237, 247, 249,' + snowflake.opacity + ')');

          ctx.beginPath();
          ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2, false);

          ctx.fillStyle = gradient;
          ctx.fill();
        });
    }
  }

  private moveSnowFlakes(): void {
    this.snowFlakesData.forEach((snowflake: ISnowFlake): void => {
      snowflake.x += snowflake.speedX;
      snowflake.y += snowflake.speedY;

      if (this.canvas && snowflake.y > this.canvas.height) {
        snowflake.x = Math.random() * this.canvas.width * 1.5;
        snowflake.y = -50;
      }
    });
  }

  private updateSnowFall(): void {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawSnowFlakes();
      this.moveSnowFlakes();
    }
  }
}
