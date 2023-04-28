import { Fade } from '../components/animations/Fade'
import { GuitarNeck } from '../components/GuitarNeck'
import { MenuBar } from '../components/MenuBar'
import { useKeyContext } from '../components/KeyContext'

export default function Home() {
  return (
    <div className="min-h-screen">
      <MenuBar />
      <div className="flex flex-col mt-30 items-center">
        <RomanChords />
        <LetterChords />
      </div>
      <GuitarNeck />
    </div>
  )
}

const RomanChords = () => {
  const { romanChords: chords } = useKeyContext()
  return (
    <Fade key={JSON.stringify(chords)}>
      <div className="justify-center items-center text-center flex flex-row mb-6">
        {chords.map((chord) => (
          <p
            key={chord}
            className="text-white mr-10 text-3xl font-inter font-thin"
          >
            {chord}
          </p>
        ))}
      </div>
    </Fade>
  )
}
const LetterChords = () => {
  const { letterChords: chords } = useKeyContext()
  return (
    <Fade key={JSON.stringify(chords)}>
      <div className=" justify-center items-center text-center flex flex-row">
        {chords.map((chord) => (
          <p
            key={chord}
            className="text-white mr-10 text-6xl font-inter font-thin"
          >
            {chord}
          </p>
        ))}
      </div>
    </Fade>
  )
}
