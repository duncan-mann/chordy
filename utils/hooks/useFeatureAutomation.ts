import { useKeyContext } from '../../components/KeyContext'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const useFeatureAutomation = () => {
  const { setRootNote, setScaleType, keySig, setActiveChord } = useKeyContext()

  const automateSetRootNote = async () => {
    setActiveChord(undefined)
    await wait(500)
    setRootNote('A')
    await wait(1000)
    setRootNote('B')
    await wait(1000)
    setRootNote('C')
    await wait(1000)
    setRootNote('D')
    await wait(1000)
    setRootNote('E')
    await wait(1000)
    setRootNote('F')
    await wait(1000)
    setRootNote('G')
    await wait(1000)
    setRootNote('A')
  }

  const automatePentatonicScale = async () => {
    await wait(1200)
    setScaleType('pentatonic')
  }

  const automateChordSelection = async () => {
    await wait(1200)
    const chords = keySig.chords
    setActiveChord(chords[0])
    await wait(1500)
    setActiveChord(chords[1])
    await wait(1500)
    setActiveChord(chords[2])
    await wait(1500)
    setActiveChord(chords[3])
    await wait(1500)
    setActiveChord(undefined)
  }

  return {
    automateSetRootNote,
    automatePentatonicScale,
    automateChordSelection,
  }
}
