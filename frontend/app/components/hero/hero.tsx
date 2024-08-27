import useStore from '../../store/useStoreHero'
import { Sprite } from '@pixi/react'
import img from '@/public/crocodile.png'

const Hero = () => {
  const x = useStore((state) => state.hero.x)
  const y = useStore((state) => state.hero.y)

  return <Sprite image={img.src} x={x} y={y} width={100} height={100} />
}

export default Hero
