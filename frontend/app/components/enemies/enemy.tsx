import useStore from '../../store/useStoreEnemies'
import { Sprite, useTick } from '@pixi/react'

const Enemy = ({ id }: { id: number }) => {

  const enemyX = useStore((state) => state.enemies[id].x)
  const enemyY = useStore((state) => state.enemies[id].y)
  const enemySrc = useStore((state) => state.enemies[id].src)
  const move = useStore((state) => state.move)
  
  console.log('render enemy')

  useTick((delta) => {
    move(id, delta)
  })

  return (
    <Sprite
      image={enemySrc}
      x={enemyX}
      y={enemyY}
      width={50}
      height={50}
      anchor={{ x: 0.5, y: 0.5 }}
    />
  )
}

export default Enemy
