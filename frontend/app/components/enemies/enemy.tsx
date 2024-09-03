import useStore from '../../store/useStoreEnemies'
import { SimpleMesh, Sprite, useTick } from '@pixi/react'

const Enemy = ({ id }: { id: number }) => {
  const w = 500
  const h = 300
  const state = {
    indices: new Uint16Array([
      0, 3, 4, 0, 1, 4, 1, 2, 4, 2, 4, 5, 3, 4, 6, 4, 6, 7, 4, 7, 8, 4, 5, 8,
    ]),
    uvs: new Float32Array([
      0, 0, 0.5, 0, 1, 0, 0, 0.5, 0.5, 0.5, 1, 0.5, 0, 1, 0.5, 1, 1, 1,
    ]),
    vertices: new Float32Array([
      0,
      0,
      w / 2,
      0,
      w,
      0,
      0,
      h / 2,
      w / 2,
      h / 2,
      w,
      h / 2,
      0,
      h,
      w / 2,
      h,
      w,
      h,
    ]),
  }

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
      width={32}
      height={32}
      anchor={{ x: 0.5, y: 0.5 }}
    />
  )
}

export default Enemy
