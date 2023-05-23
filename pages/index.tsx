import { Fade } from '../components/animations/Fade'
import { GuitarNeck } from '../components/GuitarNeck'
import { MenuBar } from '../components/MenuBar'
import { useKeyContext } from '../components/KeyContext'
import { Chord } from '../utils/get-chord'
import { ChordMode } from '../types/chords'
import { useKeyPress } from '../utils/hooks/useKeyPress'
import { FocusWrapper } from '../components/animations/FocusWrapper'
import { WelcomeSidebar } from '../components/Layout/Sidebar'

export default function Home() {
  useKeyPress()
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <MenuBar />
        <Chords />
        <div className="flex justify-center">
          <GuitarNeck />
        </div>
      </div>
      <WelcomeSidebar />
    </>
  )
}

const getChordString = (chord: Chord) => {
  const signs: Record<ChordMode, string> = {
    maj: '',
    min: 'm',
    dim: '°',
  }
  return `${chord.rootNote}${signs[chord.mode]}`
}

const Chords = () => {
  const { romanChords, keySig, setActiveChord, activeChord } = useKeyContext()
  return (
    <FocusWrapper id="chords">
      <div className="mt-30 flex justify-center h-1/3">
        <Fade
          key={JSON.stringify(keySig.chords)}
          className="flex flex-wrap justify-center items-center space-x-7 sm:space-x-10 md:space-x-16 lg:space-x-20 w-11/12"
        >
          {keySig.chords.map((chord, idx) => {
            const isActive =
              chord.rootNote == activeChord?.rootNote &&
              chord.mode === activeChord.mode
            const fontWeight = !isActive ? 'font-thin' : 'font-normal'
            return (
              <div
                className="flex flex-col justify-center items-center hover:cursor-pointer"
                key={romanChords[idx]}
                onClick={() => setActiveChord(!isActive ? chord : undefined)}
              >
                <p
                  className={`text-white font-inter mb-1 lg:mb-2 text-center ${fontWeight} text-sm md:text-lg lg:text-2xl select-none`}
                >
                  {romanChords[idx]}
                </p>
                <p
                  key={chord.rootNote}
                  className={`text-white font-inter text-center ${fontWeight} text-3xl lg:text-5xl xl:text-6xl select-none
              `}
                >
                  {getChordString(chord)}
                </p>
              </div>
            )
          })}
        </Fade>
      </div>
    </FocusWrapper>
  )
}
