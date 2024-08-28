import useStoreHero from '../../store/useStoreHero'
import { Sprite } from '@pixi/react'
import img from '@/public/crocodile.png'
import { useTick } from '@pixi/react'

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

  return (
    <Sprite
      image={img.src}
      x={x}
      y={y}
      width={100}
      height={100}
      anchor={{ x: 0.5, y: 0.5 }}
    />
  )
}

export default Hero
