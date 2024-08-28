'use client'
import { TextStyle } from 'pixi.js'
import { Stage, Container, Text } from '@pixi/react'
import useMounted from './hooks/useMounted'
import useStore from '@/app/store/useStore'
import HeroController from '@/app/components/hero/heroController'
import Enemy from '@/app/components/enemies/enemy'
import EnemyController from './components/enemies/enemyController'
import useStoreEnemies from './store/useStoreEnemies'

export default function Game() {
  const { isMounted } = useMounted()
  const { screenHeight, screenWidth } = useStore()
  //const { enemies } = useStoreEnemies()
  console.log('render game')

  return (
    <div className="flex justity-center bg-red-500">
      {isMounted && (
        <div className="flex">
          {/* <div className="px-4 flex flex-col w-40">
            {enemies.map((enemy, index) => (
              <div className="flex gap-4" key={index.toString()}>
                <div>x: {enemy.x.toFixed(1)}</div>
                <div>y: {enemy.y.toFixed(1)}</div>
              </div>
            ))}
          </div> */}
          <div className="mt-2 px-4 flex gap-2 w-60">
            <span>Height: {screenHeight}</span>{' '}
            <span>Width: {screenWidth}</span>
          </div>

          <Stage
            width={screenWidth}
            height={screenHeight}
            options={{ background: 0x1099bb }}
          >
            <EnemyController />
            <HeroController />

            <Container x={150} y={150}>
              <Text
                text={'Hello World'}
                anchor={0.5}
                x={400}
                y={400}
                filters={[]}
                style={
                  new TextStyle({
                    align: 'center',
                    fill: '0xffffff',
                    fontSize: 24,
                    letterSpacing: 10,
                    dropShadow: true,
                    dropShadowColor: '#E72264',
                    dropShadowDistance: 6,
                  })
                }
              />
            </Container>
          </Stage>
        </div>
      )}
    </div>
  )
}
