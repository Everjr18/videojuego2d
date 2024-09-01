'use client'
import useMounted from '@/app/hooks/useMounted'
import { sound } from '@pixi/sound'
import { useEffect } from 'react'

const Music = () => {
  const { isMounted } = useMounted()

  useEffect(() => {
    if (isMounted) {
      if (typeof document !== 'undefined') {
        sound.add('holes-and-bones', 'HolesAndBones.mp3')
        sound.play('holes-and-bones')
      }
    }
  }, [isMounted])

  return <></>
}

export default Music
