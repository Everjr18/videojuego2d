'use client'
import useMounted from '@/app/hooks/useMounted'
import { sound } from '@pixi/sound'
import { useEffect, useState } from 'react'

const useSound = () => {
  const [loaded, setLoaded] = useState(false)
  const { isMounted } = useMounted()

  useEffect(() => {
    if (isMounted) {
      if (typeof document !== 'undefined') {
        sound.add('sonido1', 'kalimba.wav')
        setLoaded(true)
      }
    }
  }, [isMounted])

  return { loaded }
}

export default useSound
