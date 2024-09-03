import useStore from '@/app/store/useStoreHumans'
import { Sprite, useTick } from '@pixi/react'

const Human = ({ id }: { id: number }) => {
  const size = useStore(
    (state: { humans: { size: any }[] }) => state.humans[id].size,
  )
  const x = useStore((state: { humans: { x: any }[] }) => state.humans[id].x)
  const y = useStore((state: { humans: { y: any }[] }) => state.humans[id].y)
  const src = useStore(
    (state: { humans: { src: any }[] }) => state.humans[id].src,
  )
  const move = useStore((state: { move: any }) => state.move)

  console.log('render human')

  useTick((delta) => {
    move(id, delta)
  })

  return (
    <Sprite
      image={src}
      x={x}
      y={y}
      width={size}
      height={size}
      anchor={{ x: 0.5, y: 0.5 }}
    />
  )
}

export default Human
