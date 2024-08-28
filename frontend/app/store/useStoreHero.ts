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
  hero: Entity
  move: (newX: number, newY: number) => void
}

const useStoreHero = create<StateType>((set) => ({
  hero: {
    x: 50,
    y: 50,
    dirX: 0,
    dirY: 0,
    speed: 5,
    size: 100,
  },
  move: (newX: number, newY: number) =>
    set((state) => ({
      hero: {
        ...state.hero,
        x: newX,
        y: newY,
      },
    })),
}))

export default useStoreHero
