import { GuitarNeck } from '../components/GuitarNeck'
import { useKeyPress } from '../utils/hooks/useKeyPress'
import { SideBar } from '../components/Layout/Sidebar'
import { Chords } from '../components/ChordHeader'

export default function Home() {
  useKeyPress()
  return (
    <div className={'flex flex-row min-h-screen'}>
      <SideBar />
      <div className="w-[80vw] my-auto mx-auto">
        <Chords />
        <div className="flex justify-center rounded-lg bg-white shadow-md p-5 mt-5 ">
          <GuitarNeck />
        </div>
      </div>
    </div>
  )
}
