'use client'
import useMounted from '@/app/hooks/useMounted'
import { sound } from '@pixi/sound'
import { useEffect, useState } from 'react'
import useStoreHero from '@/app/store/useStoreHero'

const Music = () => {
  const { isMounted } = useMounted()
  const { playingSound, play } = useStoreHero()
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (isMounted) {
      if (typeof document !== 'undefined') {
        sound.add('holes-and-bones', 'HolesAndBones.mp3')
        sound.play('holes-and-bones')
        sound.add('sonido1', 'kalimba.wav')
        // sound.play('sonido1')
      }
    }
  }, [isMounted])

  const playSound = () => {
    if (typeof document !== 'undefined')
      if (playingSound.estado === 'start' && isPlaying === false) {
        console.log(playingSound.estado)
        console.log(isPlaying)
        play()
        sound.play('sonido1')
        setIsPlaying(true)
      }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isMounted) {
      if (typeof document !== 'undefined') {
        if (isPlaying === true && playingSound.estado === 'stop')
          setIsPlaying(false)
        if (isPlaying === false && playingSound.estado === 'start') playSound()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playingSound])

  return <></>
}

export default Music
