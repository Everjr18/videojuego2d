import { create } from 'zustand'

type StateType = {
  keyUp: boolean
  keyDown: boolean
  keyLeft: boolean
  keyRight: boolean
  x: number
  y: number
  move: (delta: number) => void
  upPressed: () => void
  downPressed: () => void
  leftPressed: () => void
  rightPressed: () => void
  upReleased: () => void
  downReleased: () => void
  leftReleased: () => void
  rightReleased: () => void
}

const AVANCE = 5

const useStore = create<StateType>((set) => ({
  x: 0,
  y: 0,
  keyUp: false,
  keyDown: false,
  keyLeft: false,
  keyRight: false,

  move: (delta: number) =>
    set((state: StateType) => {
      let newX = state.x
      let newY = state.y

      if (state.keyUp) {
        newY -= AVANCE * delta
      }
      if (state.keyDown) {
        newY += AVANCE * delta
      }
      if (state.keyLeft) {
        newX -= AVANCE * delta
      }
      if (state.keyRight) {
        newX += AVANCE * delta
      }

      return { x: newX, y: newY }
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
