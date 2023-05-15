import { Fade } from '../components/animations/Fade'
import { GuitarNeck } from '../components/GuitarNeck'
import { MenuBar } from '../components/MenuBar'
import { useKeyContext } from '../components/KeyContext'
import { Chord } from '../utils/get-chord'
import { ChordMode } from '../types/chords'
import { useKeyPress } from '../utils/hooks/useKeyPress'

export default function Home() {
  useKeyPress()
  return (
    <div className="min-h-screen">
      <MenuBar />
      <div className="flex flex-col mt-30 items-center">
        <Chords />
      </div>
      <GuitarNeck />
    </div>
  )
}

const getChordString = (chord: Chord) => {
  const signs: Record<ChordMode, any> = {
    maj: '',
    min: 'm',
    dim: '°'
  }
  return `${chord.rootNote}${signs[chord.mode]}`
}

const Chords = () => {
  const { romanChords, keySig, setActiveChord, activeChord} = useKeyContext()
  return (
    <Fade key={JSON.stringify(keySig.chords)}>
      <div className=" justify-center items-center flex flex-row">
        {keySig.chords.map((chord, idx) => {
          const isActive = chord.rootNote == activeChord?.rootNote && chord.mode === activeChord.mode
          const fontWeight = !isActive ? 'font-thin' : 'font-normal'
          return (
          <div className="flex flex-col justify-center items-center mr-10 hover:cursor-pointer w-28" key={romanChords[idx]} onClick={() => setActiveChord(!isActive ? chord : undefined)}>
          <p
            className={`text-white text-3xl font-inter mb-3 text-center ${fontWeight}`}
          >
            {romanChords[idx]}
          </p>
          <p
            key={chord.rootNote}
            className={`text-white text-6xl font-inter text-center ${fontWeight}`}
          >
            {getChordString(chord)}
          </p>
          </div>
        )})}
      </div>
    </Fade>
  )
}
