import React from 'react'
import Hero from './hero'
import { useTick } from '@pixi/react'
import useKeyboard from '@/app/hooks/useKeyboard'
import useStoreHero from '@/app/store/useStoreHero'

const HeroController = () => {
  const { keyDown, keyUp, keyLeft, keyRight } = useKeyboard()
  const { move, hero } = useStoreHero()

  const newDir = { x: 0, y: 0 }

  if (keyDown) newDir.y = 1
  if (keyUp) newDir.y = -1
  if (keyLeft) newDir.x = -1
  if (keyRight) newDir.x = 1

  useTick((delta) => {
    move(hero.x + newDir.x * delta * 5, hero.y + newDir.y * delta * 5)
  })

  return <Hero />
}

export default HeroController
