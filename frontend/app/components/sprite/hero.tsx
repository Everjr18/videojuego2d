import useStore from '../../store/useStore'
import { Sprite, useTick } from '@pixi/react'
import img from '@/public/crocodile.png'

const Hero = () => {
  const heroSpriteUrl = ''
  const heroX = useStore((state) => state.hero.x)
  const heroY = useStore((state) => state.hero.y)
  const move = useStore((state) => state.moveHero)

  useTick((delta) => {
    move(delta)
  })

  return <Sprite image={img.src} x={heroX} y={heroY} width={100} height={100} />
}

export default Hero
