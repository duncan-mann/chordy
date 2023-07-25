import { useKeyContext } from '../../components/KeyContext'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const useFeatureAutomation = () => {
  const {
    setDisplayRootNoteOptions,
    setRootNote,
    setScaleType,
    keySig,
    setActiveChord,
  } = useKeyContext()

  const automateSetRootNote = async () => {
    await wait(1200)
    setDisplayRootNoteOptions(true)
    setTimeout(() => {
      setDisplayRootNoteOptions(false)
      setRootNote('F')
    }, 2000)
  }

  const automatePentatonicScale = async () => {
    await wait(1200)
    setScaleType('pentatonic')
    await wait(2500)
    setScaleType('base')
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
