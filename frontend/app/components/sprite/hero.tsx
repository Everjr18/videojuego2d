import useStore from '../../store/useStore'
import { Sprite, useTick } from '@pixi/react'
import img from '@/public/crocodile.png'
import img2 from '@/public/parrot.png'
import { Stage, Graphics } from '@pixi/react'

const Hero = () => {
  const heroSpriteUrl = ''
  const heroX = useStore((state) => state.hero.x)
  const heroY = useStore((state) => state.hero.y)
  const move = useStore((state) => state.moveHero)
  const topCollision = useStore((state) => state.topCollision)
  const bottomCollision = useStore((state) => state.bottomCollision)
  const leftCollision = useStore((state) => state.topCollision)
  const rightCollision = useStore((state) => state.bottomCollision)

  useTick((delta) => {
    move(delta)
  })

  return (
    <>
      <Sprite
        image={img2.src}
        x={heroX}
        y={heroY}
        width={100}
        height={10 * (topCollision ? 1 : 0)}
      />
      <Sprite image={img2.src} x={heroX} y={heroY+10} width={10*(leftCollision ? 1 : 0)} height={80} />
      <Sprite
        image={img.src}
        x={heroX+10}
        y={heroY+10}
        width={100 - 20}
        height={80}
      />
      <Sprite
        image={img2.src}
        x={heroX + 80 + 10}
        y={heroY+10}
        width={10*(rightCollision ? 1 : 0)}
        height={80}
      />
      <Sprite
        image={img2.src}
        x={heroX}
        y={heroY + 80 + 10}
        width={100}
        height={10 * (bottomCollision ? 1 : 0)}
      />
    </>
  )
}

export default Hero
