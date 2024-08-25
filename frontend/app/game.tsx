'use client'
import { BlurFilter, TextStyle } from 'pixi.js'
import { Stage, Container, Sprite, Text } from '@pixi/react'
import { t1, t2 } from './components/rat-tunnel/tunnels'
import useKeyboard from './components/keyboard/useKeyboard'
import Hero from './components/sprite/hero'
import Chicken from './components/sprite/chicken'
import Parrot from './components/sprite/parrot'
import useMounted from './hooks/useMounted'
import useStore from '@/app/store/useStore'

const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png'

export default function Game() {
  const { isMounted } = useMounted()
  useKeyboard()
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
            <Hero />

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

          <div id="ui" className="pt-2">
            <Stage width={160} height={160} options={{ background: 0x1099bb }}>
              <t1.Out />
            </Stage>
          </div>
        </>
      )}
      <DrawSprite />
    </>
  )
}

const DrawSprite = () => {
  return (
    <t1.In>
      <Sprite image={bunnyUrl} x={10} y={10} />
      <Sprite image={bunnyUrl} x={20} y={20} />
      <Sprite image={bunnyUrl} x={30} y={30} />
      <Sprite image={bunnyUrl} x={40} y={40} />
      <Sprite image={bunnyUrl} x={50} y={50} />
      <Sprite image={bunnyUrl} x={60} y={60} />
    </t1.In>
  )
}
