import { create } from 'zustand'
import { sound } from '@pixi/sound'
import useSound from '@/app/components/sound/useSound'

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
  playingSound: { estado: 'start' | 'playing' | 'stop' }
  move: (newX: number, newY: number) => void
  play: () => void
}

const useStoreHero = create<StateType>((set) => {
  // const loaded = useSound()

  return {
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
    playingSound: { estado: 'stop' },
    play: () => {
      set((state) => ({ playingSound: { estado: 'start' } }))
      setTimeout(() => {
        set((state) => ({ playingSound: { estado: 'playing' } }))
      }, 150) // Cambiar a false después de 1 segundo
      setTimeout(() => {
        set((state) => ({ playingSound: { estado: 'stop' } }))
      }, 300) // Cambiar a false después de 1 segundo
    },
  }
})

export default useStoreHero
