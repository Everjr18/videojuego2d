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
  moveEnemy: (id: number, delta: number) => void
  topCollision: boolean
  bottomCollision: boolean
  leftCollision: boolean
  rightCollision: boolean
}

const useStore = create<StateType>((set) => ({
  screenWidth: 1024,
  screenHeight: 800,
  topCollision: false,
  bottomCollision: false,
  leftCollision: false,
  rightCollision: false,
  hero: {
    x: 0,
    y: 0,
    dirX: 0,
    dirY: 0,
    speed: 5,
    size: 100,
  },
  enemies: [
    { x: 0, y: 0, dirX: 0.5, dirY: 0.25, speed: 0.25, size: 50 },
    { x: 100, y: 100, dirX: 0.25, dirY: 1, speed: 1, size: 50 },
    { x: 150, y: 150, dirX: 0.75, dirY: 0.75, speed: 2, size: 50 },
    { x: 40, y: 40, dirX: 0.25, dirY: 0.5, speed: 0.5, size: 50 },
    { x: 160, y: 160, dirX: 1, dirY: 0.25, speed: 1, size: 50 },
  ],
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
          // Calcular cuánto se superponen
          const overlapX = Math.min(
            hero.x + heroSize - e.x,
            e.x + enemySize - hero.x,
          )
          const overlapY = Math.min(
            hero.y + heroSize - e.y,
            e.y + enemySize - hero.y,
          )

          // Detectar la colisión predominante
          if (overlapX > overlapY) {
            // Colisión vertical (superior o inferior)
            if (hero.y < e.y) {
              // Colisión con borde superior
              console.log('TOP')
              set({
                topCollision: false,
                bottomCollision: true,
                leftCollision: false,
                rightCollision: false,
              })
              e.dirY *= -1
              e.y += overlapY // Mover hacia fuera de la colisión en Y
            } else {
              // Colisión con borde inferior
              console.log('BOTTOM')
              set({
                topCollision: true,
                bottomCollision: false,
                leftCollision: false,
                rightCollision: false,
              })
              e.dirY *= -1
              e.y -= overlapY // Mover hacia fuera de la colisión en Y
            }
          } else {
            // Colisión horizontal (izquierda o derecha)
            if (hero.x < e.x) {
              console.log('RIGHT')
              // Colisión con borde izquierdo
              set({
                topCollision: false,
                bottomCollision: false,
                leftCollision: false,
                rightCollision: true,
              })
              e.dirX *= -1
              e.x += overlapX // Mover hacia fuera de la colisión en X
            } else {
              console.log('LEFT')
              // Colisión con borde derecho
              set({
                topCollision: false,
                bottomCollision: false,
                leftCollision: true,
                rightCollision: false,
              })
              e.dirX *= -1
              e.x -= overlapX // Mover hacia fuera de la colisión en X
            }
          }
        }

        return c
      })

      return { enemies: updatedEnemies }
    }),
  
}))

export default useStore
