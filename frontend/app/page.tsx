import Game from './game'
import Intro from './intro'

export default function Home() {
  return (
    <main className="m-8 text-center">
      <Intro />
      <Game />
    </main>
  )
}
