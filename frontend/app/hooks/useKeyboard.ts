import { useEffect } from 'react'
import useStoreKeyboard from '../store/useStoreKeyboard'

const useKeyboard = () => {
  const {
    upPressed,
    downPressed,
    leftPressed,
    rightPressed,
    upReleased,
    downReleased,
    leftReleased,
    rightReleased,
    keyDown,
    keyUp,
    keyLeft,
    keyRight,
  } = useStoreKeyboard()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') upPressed()
      if (e.key === 'ArrowDown') downPressed()
      if (e.key === 'ArrowLeft') leftPressed()
      if (e.key === 'ArrowRight') rightPressed()
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') upReleased()
      if (e.key === 'ArrowDown') downReleased()
      if (e.key === 'ArrowLeft') leftReleased()
      if (e.key === 'ArrowRight') rightReleased()
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [
    upPressed,
    downPressed,
    leftPressed,
    rightPressed,
    upReleased,
    downReleased,
    leftReleased,
    rightReleased,
  ])

  return {
    keyDown,
    keyUp,
    keyLeft,
    keyRight,
  }
}

export default useKeyboard
