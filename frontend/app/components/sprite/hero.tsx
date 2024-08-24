import useStore from '../../states/useStore'
import { Sprite, useTick } from '@pixi/react'

const Hero = () => {
  const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png'
  const x = useStore((state) => state.x)
  const y = useStore((state) => state.y)
  const move = useStore((state) => state.move)

  useTick((delta) => {
    move(delta)
  })

  return <Sprite image={bunnyUrl} x={x} y={y} />
}

export default Hero
