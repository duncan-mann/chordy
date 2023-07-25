import { GuitarNeck } from '../components/GuitarNeck'
import { useKeyPress } from '../utils/hooks/useKeyPress'
import { MENU_BAR_SCREEN_SIZE, SideBar } from '../components/Layout/Sidebar'
import { Chords } from '../components/ChordHeader'
import { MenuBar } from '../components/MenuBar'
import { useKeyContext } from '../components/KeyContext'

export default function Home() {
  useKeyPress()
  const { width } = useKeyContext()
  return (
    <div className={' bg-slate-900 p-5 flex flex-row justify-between'}>
      <SideBar />
      <div className={'flex flex-row h-[95vh] bg-zinc-100 rounded-xl'}>
        <div className="w-[83vw] my-auto mx-auto p-8">
          {width && width < MENU_BAR_SCREEN_SIZE && <MenuBar theme="dark" />}
          <Chords />
          <div className="flex justify-center rounded-lg bg-white shadow-md p-5 mt-5 ">
            <GuitarNeck />
          </div>
        </div>
      </div>
    </div>
  )
}
