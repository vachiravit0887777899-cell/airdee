export interface RainDrop {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
}

export function getRainDropCount(rainProbability: number): number {
  if (rainProbability < 60) return 0
  if (rainProbability < 75) return 60
  if (rainProbability < 90) return 120
  return 180
}

export function createRainDrop(width: number, height: number): RainDrop {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    length: Math.random() * 15 + 10,
    speed: Math.random() * 4 + 6,
    opacity: Math.random() * 0.3 + 0.2,
  }
}

export function updateRainDrop(drop: RainDrop, width: number, height: number): void {
  drop.y += drop.speed
  drop.x -= drop.speed * 0.3

  if (drop.y > height) {
    drop.y = -20
    drop.x = Math.random() * width
  }
  if (drop.x < 0) drop.x = width
}