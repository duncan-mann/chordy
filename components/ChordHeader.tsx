import { ChordMode } from '../types/chords'
import { Chord } from '../utils/get-chord'
import { useKeyContext } from './KeyContext'
import { Fade } from './animations/Fade'

const getChordString = (chord: Chord) => {
  const signs: Record<ChordMode, string> = {
    maj: '',
    min: 'm',
    dim: '°',
  }
  return `${chord.rootNote}${signs[chord.mode]}`
}

export const Chords = () => {
  const { romanChords, keySig, setActiveChord, activeChord } = useKeyContext()
  return (
    <div className="mt-30 flex flex-wrap justify-center">
      <Fade
        key={JSON.stringify(keySig.chords)}
        className="flex flex-wrap items-center w-11/12 justify-center"
      >
        {keySig.chords.map((chord, idx) => {
          const isActive =
            chord.rootNote == activeChord?.rootNote &&
            chord.mode === activeChord.mode
          const fontWeight = !isActive ? 'font-normal' : 'font-bold'
          const buttonStyles = isActive
            ? 'bg-cageda border-2 border-cageda  bg-transition-colors duration-300 text-white font-bold'
            : 'border-2 border-stone-800 bg-transition-colors duration-300 text-black font-normal'
          return (
            <div
              className={`flex flex-col justify-center items-center hover:cursor-pointer px-1 py-2 md:py-4 md:px-4 `}
              key={romanChords[idx]}
              onClick={() => setActiveChord(!isActive ? chord : undefined)}
            >
              <p
                className={`text-black font-inter mb-1 lg:mb-2 text-center ${fontWeight} text-sm md:text-md select-none`}
              >
                {romanChords[idx]}
              </p>
              <p
                key={chord.rootNote}
                className={` font-poppins text-center text-sm md:text-md lg:text-xl select-none w-20 md:w-28 rounded-full py-1 px-4 hover:scale-110 transition ease-in-out ${fontWeight} ${buttonStyles}
                `}
              >
                {getChordString(chord)}
              </p>
            </div>
          )
        })}
      </Fade>
    </div>
  )
}
