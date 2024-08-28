import { create } from 'zustand'

type StateType = {
  screenWidth: number
  screenHeight: number
}

const useStore = create<StateType>((set) => ({
  screenWidth: 800,
  screenHeight: 600,
}))

export default useStore
