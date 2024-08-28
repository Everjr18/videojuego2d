import { create } from 'zustand'
import useStore from './useStore'
import img1 from '@/public/chicken.png'
import img2 from '@/public/parrot.png'

type Entity = {
  x: number
  y: number
  dirX: number
  dirY: number
  speed: number
  size: number
  src: string
}

type StateType = {
  enemies: Entity[]
  move: (id: number, delta: number) => void
}

const useStoreEnemies = create<StateType>((set, get) => ({
  // Obtén screenWidth y screenHeight desde useStore
  enemies: [
    { x: 0, y: 0, dirX: 0.5, dirY: 0.25, speed: 0.25, size: 50, src: img2.src },
    { x: 100, y: 100, dirX: 0.25, dirY: 1, speed: 1, size: 50, src: img2.src },
    {
      x: 150,
      y: 150,
      dirX: 0.75,
      dirY: 0.75,
      speed: 2,
      size: 50,
      src: img1.src,
    },
    {
      x: 40,
      y: 40,
      dirX: 0.25,
      dirY: 0.5,
      speed: 0.5,
      size: 50,
      src: img1.src,
    },
    { x: 160, y: 160, dirX: 1, dirY: 0.25, speed: 1, size: 50, src: img1.src },
  ],
  move: (id: number, delta: number) =>
    set((state: StateType) => {
      const { screenWidth, screenHeight } = useStore.getState()
      const enemy = state.enemies[id]
      const velocity = enemy.speed
      let newX = enemy.x + velocity * enemy.dirX * delta
      let newY = enemy.y + velocity * enemy.dirY * delta

      // Screen boundaries
      const minX = 0
      const maxX = screenWidth
      const minY = 0
      const maxY = screenHeight

      // Check if the enemy hits the boundaries and invert direction if necessary
      if (newX < minX || newX > maxX) {
        newX = Math.max(minX, Math.min(newX, maxX))
        enemy.dirX *= -1
      }

      if (newY < minY || newY > maxY) {
        newY = Math.max(minY, Math.min(newY, maxY))
        enemy.dirY *= -1
      }

      const updatedEnemies = state.enemies.map((e, index) =>
        index === id ? { ...e, x: newX, y: newY } : e,
      )

      return { enemies: updatedEnemies }
    }),
}))

export default useStoreEnemies
