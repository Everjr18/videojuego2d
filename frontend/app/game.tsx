/* eslint-disable @next/next/no-img-element */
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
import Heart from './components/svgs/heart'
import { useCreateImage } from './hooks/useCreateImage'

const Music = dynamic(() => import('./components/music/music'))

export default function Game() {
  const { isMounted } = useMounted()
  const { screenHeight, screenWidth } = useStore()
  const { updateSrc } = useStoreEnemies()
  const { imageUrl, slug } = useCreateImage()
  // console.log('render game')

  return (
    <div className="flex justity-center text-primary text-lg">
      {isMounted && (
        <div className="flex flex-wrap justify-center w-full my-20">
          <div className="flex">
            <div className="hidden lg:flex mt-2 px-4 lg:w-40 lg:flex-col lg:gap-4">
              <div>
                <div className="font-bold">Score </div>
                <div className="text-yellow-400 font-semibold text-sm">
                  0 points
                </div>
              </div>
              <div>
                <div className="font-bold mb-1">Lives</div>
                <div className="flex">
                  <Heart />
                  <Heart />
                  <Heart />
                  <Heart />
                  <Heart />
                </div>
              </div>
              <div className="w-4/5 mx-auto">
                <div className="font-bold"> Health </div>
                <progress
                  className="progress progress-success"
                  value="100"
                  max="100"
                />
              </div>
            </div>
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

                {/* <Container x={200} y={150}>
                  <Text
                    text={'Fuera de Control'}
                    anchor={0.5}
                    x={150}
                    y={100}
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
                </Container> */}
              </Stage>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
