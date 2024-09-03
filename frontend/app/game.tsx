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
import HumanController from './components/humans/humanController'
import Keyboard from './components/keyboard/keyboard'

const Music = dynamic(() => import('./components/music/music'))

export default function Game() {
  const { isMounted } = useMounted()
  const { screenHeight, screenWidth } = useStore()
  const { updateSrc } = useStoreEnemies()
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  console.log('render game')

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch('http://localhost:3000/api/create')
        const data1 = await res1.json()
        console.log(data1)
        const id = data1.result
        console.log(id)
        await sleep(5000)
        const res2 = await fetch(`http://localhost:3000/api/image/${id}`)
        const data2 = await res2.json()
        console.log(data2)
        setImageUrl(data2.result.assets[0].url)
        updateSrc(data2.result.assets[0].url)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex justity-center text-primary text-lg">
      {isMounted && (
        <div className="flex flex-wrap justify-center w-full my-20">
          <div className="mt-2 px-4 w-40 flex flex-col gap-2">
            <span>Score: 1000 </span>
            <span>Lives: 3</span>
            <div>
              {imageUrl && (
                <img src={imageUrl} width={200} height={200} alt="IA image" />
              )}
            </div>
          </div>
          <div>            
            <Music />
            <div className="shadow-2xl bg-primary border border-primary rounded-3xl p-4">
            <Stage
              width={screenWidth}
              height={screenHeight}
              options={{ background: 0x000000 }}
            >
              <EnemyController />
              <HumanController />
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
          </div>
          <div>
            <div className="mt-2 px-4 flex flex-col gap-2">
              
              <span>Teclado</span>              
            </div>
            <Keyboard />
          </div>
        </div>
      )}
    </div>
  )
}
