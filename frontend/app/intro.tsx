/* eslint-disable react/no-unescaped-entities */
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
  const { imageUrl, slug } = useCreateImage()

  return (
    <div className="flex justity-center text-base-content text-lg">
      {isMounted && (
        <div className="flex flex-wrap justify-center w-full mt-10 mb-10">
          <div>
            <div>
              {imageUrl && (
                <div className="p-4">
                  <img
                    className="w-full h-full rounded shadow-2xl"
                    src={imageUrl}
                    width={300}
                    height={300}
                    alt="IA created"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="btn mt-4 btn-primary text-primary-content">
                {' '}
                Start Game{' '}
              </div>
              <div className="btn mt-4"> Credits </div>
              <div className="btn mt-4"> Tutorial </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mt-4 font-bold text-xl">Breaking News</div>
            <div className="text-lg">We've just arrived on a new planet!</div>
            <div className="text-lg">Welcome to Planet {slug}</div>
            <div className="max-w-prose text-balance">
              <div className="mt-4  font-bold"> English Tutorial</div>
              <div>Use the W, A, S, D keys to move your character.</div>
              <div>Rescue the stranded aliens across the map.</div>
              <div>
                You control a yellow, mutant humanoid bird superhero with
                special powers.
              </div>
              <div>
                Avoid or destroy the enemy UFOs to complete your mission.
            <div className="mt-4 font-bold text-xl">Últimas Noticias</div>
            <div className="text-lg">
              ¡Acabamos de llegar a un nuevo planeta!
            </div>
            <div className="text-lg">Bienvenido al Planeta {slug}</div>
              </div>              
            </div>
            <div className="max-w-prose text-balance">
              <div className="mt-4  font-bold"> Tutorial en Español </div>
              <div>Usa las teclas W, A, S, D para mover a tu personaje.</div>
              <div>Rescata a los alienígenas varados en el mapa.</div>
              <div>
                Controlas a un superhéroe pájaro humanoide mutante amarillo con
                poderes especiales.
              </div>
              <div>
                Evita o destruye los ovnis enemigos para completar tu misión.
              </div>
              <Keyboard />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
