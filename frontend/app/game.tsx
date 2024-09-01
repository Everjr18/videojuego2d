'use client'
import { TextStyle } from 'pixi.js'
import { Stage, Container, Text } from '@pixi/react'
import useMounted from './hooks/useMounted'
import useStore from '@/app/store/useStore'
import HeroController from '@/app/components/hero/heroController'
import Enemy from '@/app/components/enemies/enemy'
import EnemyController from './components/enemies/enemyController'
import useStoreEnemies from './store/useStoreEnemies'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'

const Music = dynamic(() => import('./components/music/music'))

export default function Game() {
  const { isMounted } = useMounted()
  const { screenHeight, screenWidth } = useStore()
  console.log('render game')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/test')
        const data = await res.json()
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex justity-center bg-blue-300">
      {isMounted && (
        <div className="flex">
          <div className="mt-2 px-4 flex gap-2 w-60 text-black">
            <span>Height: {screenHeight}</span>{' '}
            <span>Width: {screenWidth}</span>
          </div>
          <Music />
          <Stage
            width={screenWidth}
            height={screenHeight}
            options={{ background: 0x1099bb }}
          >
            <EnemyController />
            <HeroController />

            <Container x={150} y={150}>
              <Text
                text={'Fuera de Control'}
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
