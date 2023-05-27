import { GuitarNeck } from '../components/GuitarNeck'
import { useKeyPress } from '../utils/hooks/useKeyPress'
import { MENU_BAR_SCREEN_SIZE, SideBar } from '../components/Layout/Sidebar'
import { Chords } from '../components/ChordHeader'
import useWindowDimensions from '../utils/hooks/useWindowDimensions'
import { MenuBar } from '../components/MenuBar'

export default function Home() {
  useKeyPress()
  const { width } = useWindowDimensions()
  return (
    <div className={'flex flex-row min-h-screen'}>
      <SideBar />
      <div className="w-[80vw] my-auto mx-auto">
        {width < MENU_BAR_SCREEN_SIZE && <MenuBar theme="dark" />}
        <Chords />
        <div className="flex justify-center rounded-lg bg-white shadow-md p-5 mt-5 ">
          <GuitarNeck />
        </div>
      </div>
    </div>
  )
}
