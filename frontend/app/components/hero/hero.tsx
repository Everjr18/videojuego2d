import useStoreHero from '../../store/useStoreHero'
import { Sprite, useApp, AnimatedSprite } from '@pixi/react'
import img from '@/public/crocodile.png'
import { useTick } from '@pixi/react'
import { useEffect, useState } from 'react'
import * as PIXI from 'pixi.js'

const spritesheet =
  'https://pixijs.io/examples/examples/assets/spritesheet/fighter.json'

const Hero = () => {
  const { move } = useStoreHero()
  const x = useStoreHero((state) => state.hero.x)
  const y = useStoreHero((state) => state.hero.y)
  const dirX = useStoreHero((state) => state.hero.dirX)
  const dirY = useStoreHero((state) => state.hero.dirY)

  console.log('render hero')

  useTick((delta) => {
    if (dirX === 0 && dirY === 0) return
    move(x + dirX * delta * 5, y + dirY * delta * 5)
  })

  const [frames, setFrames] = useState<PIXI.Texture[]>([])
  useEffect(() => {
    // Cargar el spritesheet usando PIXI.Assets.load
    const loadTextures = async () => {
      try {
        // Cargar el spritesheet y la imagen
        const spriteSheet = await PIXI.Assets.load('spritesheet.json')
        const { animations, textures } = spriteSheet
        const frames = animations['fly'] || []
        setFrames(frames)
      } catch (error) {
        console.error('Error loading spritesheet:', error)
      }
    }

    loadTextures()
  }, [])

  return (
    <>
      {frames.length > 0 && (
        <AnimatedSprite
          textures={frames}
          isPlaying={true}
          animationSpeed={0.3}
          loop={true}
          x={x}
          y={y}
          anchor={0.5}
          scale={{ x: 0.5, y: 0.5 }}
        />
      )}
    </>
  )
}

export default Hero
