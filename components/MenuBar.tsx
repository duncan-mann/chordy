import { notes } from '../utils/music-theory'
import { useKeyContext } from './KeyContext'

export const MenuBar = () => {
  const {
    rootNote,
    mode,
    setMode,
    scaleType,
    setScaleType,
    setDisplayRootNoteOptions,
  } = useKeyContext()

  const togglePentatonic = () => {
    setDisplayRootNoteOptions(false)
    if (scaleType === 'base') return setScaleType('pentatonic')
    return setScaleType('base')
  }

  const toggleMode = () => {
    setDisplayRootNoteOptions(false)
    setMode((mode) => (mode == 'maj' ? 'min' : 'maj'))
  }
  const toggleRootNoteDisplay = () =>
    setDisplayRootNoteOptions((state) => !state)

  return (
    <div className="flex flex-col items-center h-20">
      <div className="mt-3 mb-28 flex flex-row items-center justify-center">
        <div className={'flex flex-row items-center p-1'}>
          <h3
            className="font-poppins font-bold text-4xl text-white mr-3 cursor-pointer"
            onClick={toggleRootNoteDisplay}
          >
            {rootNote}
          </h3>
          <h3
            className="font-poppins font-bold text-2xl text-white cursor-pointer"
            onClick={toggleMode}
          >
            {mode}
          </h3>
        </div>
        <div
          className={`flex justify-normal place-items-center ${
            scaleType !== 'pentatonic' && 'opacity-30'
          } cursor-pointer p-2 rounded-full h-12 w-12`}
          onClick={togglePentatonic}
        >
          <img src={'./pentagon.png'} className="h-7" />
        </div>
      </div>
    </div>
  )
}
