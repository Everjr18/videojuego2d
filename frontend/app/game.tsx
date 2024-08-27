'use client'
import { TextStyle } from 'pixi.js'
import { Stage, Container, Text } from '@pixi/react'
import useMounted from './hooks/useMounted'
import useStore from '@/app/store/useStore'
import HeroController from '@/app/components/hero/heroController'
import Chicken from '@/app/components/sprite/chicken'
import Parrot from '@/app/components/sprite/parrot'

export default function Game() {
  const { isMounted } = useMounted()
  const { screenHeight, screenWidth } = useStore()

  return (
    <>
      {isMounted && (
        <>
          <Stage
            width={screenWidth}
            height={screenHeight}
            options={{ background: 0x1099bb }}
          >

            <Chicken id={0} />
            <Parrot id={1} />
            <Chicken id={2} />
            <Parrot id={3} />
            <Chicken id={4} />
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
        </>
      )}
    </>
  )
}
