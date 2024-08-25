import { create } from 'zustand'

type Entity = {
  x: number
  y: number
  dirX: number
  dirY: number
  speed: number
  size: number
}

type StateType = {
  screenWidth: number
  screenHeight: number
  hero: Entity
  enemies: Entity[]
  moveHero: (delta: number) => void
  moveEnemy: (id: number, delta: number) => void
  keyUp: boolean
  keyDown: boolean
  keyLeft: boolean
  keyRight: boolean
  upPressed: () => void
  downPressed: () => void
  leftPressed: () => void
  rightPressed: () => void
  upReleased: () => void
  downReleased: () => void
  leftReleased: () => void
  rightReleased: () => void
}

const useStore = create<StateType>((set) => ({
  screenWidth: 1024,
  screenHeight: 800,
  hero: {
    x: 0,
    y: 0,
    dirX: 0,
    dirY: 0,
    speed: 5,
    size: 100,
  },

  enemies: [
    { x: 0, y: 0, dirX: 1, dirY: 1, speed: 1, size: 50 },
    { x: 100, y: 100, dirX: 5, dirY: 1, speed: 1, size: 50 },
    { x: 150, y: 150, dirX: 5, dirY: 1, speed: 1, size: 50 },
    { x: 40, y: 40, dirX: 5, dirY: 1, speed: 1, size: 50 },
    { x: 160, y: 160, dirX: 1, dirY: 1, speed: 1, size: 50 },
  ],

  keyUp: false,
  keyDown: false,
  keyLeft: false,
  keyRight: false,

  moveEnemy: (id: number, delta: number) =>
    set((state: StateType) => {
      const enemy = state.enemies[id]
      const velocity = enemy.speed
      let newX = enemy.x + velocity * enemy.dirX * delta
      let newY = enemy.y + velocity * enemy.dirY * delta

      // Screen boundaries
      const minX = 0
      const maxX = state.screenWidth - 32
      const minY = 0
      const maxY = state.screenHeight - 32

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

      // Check for collisions
      const hero = state.hero
      const enemySize = enemy.size
      const heroSize = hero.size

      const collision = updatedEnemies.some((e) => {
        const c =
          e !== enemy &&
          e.x < hero.x + heroSize &&
          e.x + enemySize > hero.x &&
          e.y < hero.y + heroSize &&
          e.y + enemySize > hero.y

        if (c) {
          e.dirX *= -1
          e.x = 0
          e.dirY *= -1
        }

        return c
      })

      if (collision) {
        // Handle collision: invert direction of the enemy
      }

      return { enemies: updatedEnemies }
    }),

  moveHero: (delta: number) =>
    set((state: StateType) => {
      let newX = state.hero.x
      let newY = state.hero.y
      const velocity = state.hero.speed

      if (state.keyUp) {
        newY -= velocity * delta
      }
      if (state.keyDown) {
        newY += velocity * delta
      }
      if (state.keyLeft) {
        newX -= velocity * delta
      }
      if (state.keyRight) {
        newX += velocity * delta
      }
      return { hero: { ...state.hero, x: newX, y: newY } }
    }),

  upPressed: () => set({ keyUp: true }),
  downPressed: () => set({ keyDown: true }),
  leftPressed: () => set({ keyLeft: true }),
  rightPressed: () => set({ keyRight: true }),
  upReleased: () => set({ keyUp: false }),
  downReleased: () => set({ keyDown: false }),
  leftReleased: () => set({ keyLeft: false }),
  rightReleased: () => set({ keyRight: false }),
}))

export default useStore
