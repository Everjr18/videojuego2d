import { create } from 'zustand'

type StateType = {
  screenWidth: number
  screenHeight: number
}

const useStore = create<StateType>((set) => ({
  screenWidth: 640,
  screenHeight: 480,
}))

export default useStore
