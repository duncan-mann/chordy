import { GuitarNeck } from '../components/GuitarNeck'
import { useKeyPress } from '../utils/hooks/useKeyPress'
import { SideBar } from '../components/Layout/Sidebar'
import { Chords } from '../components/ChordHeader'
import { ChordDisplay, KeyDisplay } from '../components/KeyDisplay'

export default function Home() {
  useKeyPress()
  return (
    <div className="bg-slate-900 flex flex-col px-5 lg:px-10">
      <NavBar />
      <div className={' bg-slate-900 flex flex-row justify-between'}>
        <SideBar />
        <div className={'flex flex-col h-[88vh] bg-zinc-100 rounded-3xl'}>
          <div className="mt-5 mx-10 flex flex-row justify-between">
            <KeyDisplay theme={'dark'} />
            <div className="justify-self-center">
              <ChordDisplay />
            </div>
          </div>
          <div className="w-[83vw] mx-auto p-8">
            <Chords />
            <div className="flex justify-center rounded-lg bg-white shadow-md p-5 mt-5 ">
              <GuitarNeck />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const NavBar = () => {
  return (
    <div className="flex flex-row h-10 pt-5 mb-5 min-w-full">
      <h3 className={`font-poppins font-bold text-xl text-white mr-3 sticky`}>
        fretboard.fyi
      </h3>
    </div>
  )
}
