import useStore from '../../store/useStore'
import { Sprite, useTick } from '@pixi/react'
import img from '@/public/chicken.png'

const Enemy = ({ id }: { id: number }) => {
  const enemyX = useStore((state) => state.enemies[id].x)
  const enemyY = useStore((state) => state.enemies[id].y)
  const move = useStore((state) => state.moveEnemy)

  useTick((delta) => {
    move(id, delta)
  })

  return <Sprite image={img.src} x={enemyX} y={enemyY} width={50} height={50} />
}

export default Enemy
