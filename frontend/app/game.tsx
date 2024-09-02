'use client'
import { TextStyle } from 'pixi.js'
import { Stage, Container, Text } from '@pixi/react'
import useMounted from './hooks/useMounted'
import useStore from '@/app/store/useStore'
import HeroController from '@/app/components/hero/heroController'
import Enemy from '@/app/components/enemies/enemy'
import EnemyController from './components/enemies/enemyController'
import useStoreEnemies from './store/useStoreEnemies'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const Music = dynamic(() => import('./components/music/music'))

export default function Game() {
  const { isMounted } = useMounted()
  const { screenHeight, screenWidth } = useStore()
  const { updateSrc } = useStoreEnemies()
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  console.log('render game')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/image/25386')
        const data = await res.json()
        setImageUrl(data.result.assets[0].url)
        updateSrc(data.result.assets[0].url)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex justity-center bg-blue-300">
      {isMounted && (
        <div className="flex justify-center w-full my-20">
          <div className="mt-2 px-4 w-60 flex flex-col text-2xl gap-2 text-black">
            <span>Level 1</span>
            <span>Country: Argentina </span>
            <div>
              {imageUrl && (
                <img src={imageUrl} width={100} height={100} alt="IA image" />
              )}
            </div>
          </div>
          <div>
            <div className="text-black text-2xl mb-4">
              COVID-19: Fuera de Control{' '}
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
          <div className="mt-2 px-4 flex flex-col gap-2 text-black text-2xl">
            <span>Score: {screenHeight}</span> <span>Cured: {screenWidth}</span>
            <span>Infected: {screenWidth}</span>
            <span>Deads: {screenWidth}</span>
          </div>
        </div>
      )}
    </div>
  )
}
