import { useRef } from 'react'
import { SelectorTooltip } from './SelectorTooltip'
import { notes } from '../utils/music-theory'
import { useKeyContext } from './KeyContext'
import { FocusWrapper } from './animations/FocusWrapper'
import { useOnClickOutside } from 'usehooks-ts'

export const MenuBar = () => {
  const {
    setRootNote,
    rootNote,
    mode,
    setMode,
    setActiveChord,
    scaleType,
    setSidebarIsOpen,
    setScaleType,
    displayRootNoteOptions,
    setDisplayRootNoteOptions,
  } = useKeyContext()

  const ref = useRef(null)
  const handleClickOutside = () => {
    if (displayRootNoteOptions) setDisplayRootNoteOptions(false)
  }
  useOnClickOutside(ref, handleClickOutside)

  const filteredNotes = notes.filter((note) => note !== rootNote)

  const togglePentatonic1 = () => {
    setDisplayRootNoteOptions(false)
    if (scaleType === 'base') return setScaleType('pentatonic')
    return setScaleType('base')
  }
  const togglePentatonic = () => {
    setSidebarIsOpen((state) => !state)
  }

  const rootNoteOptions = filteredNotes.map((note) => ({
    text: note,
    onClick: () => {
      setRootNote(note)
      setActiveChord(undefined)
      setDisplayRootNoteOptions(false)
    },
  }))

  const toggleMode = () => {
    setDisplayRootNoteOptions(false)
    setMode((mode) => (mode == 'maj' ? 'min' : 'maj'))
  }
  const toggleRootNoteDisplay = () =>
    setDisplayRootNoteOptions((state) => !state)

  return (
    <div ref={ref}>
      <div className="flex flex-col">
        <div className="h-15 mt-3 mb-28 ml-10 flex flex-row items-center">
          <div className={'flex flex-row items-center p-1'}>
            <h3
              className="font-inter font-thin text-4xl text-white mr-3 cursor-pointer"
              onClick={toggleRootNoteDisplay}
            >
              {rootNote}
            </h3>
            <h3
              className="font-inter font-thin text-2xl text-white cursor-pointer"
              onClick={toggleMode}
            >
              {mode}
            </h3>
          </div>
          <FocusWrapper id="pentatonic" className={'inline-block'}>
            <div
              className={`flex justify-normal place-items-center ${
                scaleType !== 'pentatonic' && 'opacity-30'
              } cursor-pointer p-2 rounded-full h-12 w-12`}
              onClick={togglePentatonic}
            >
              <img src={'./pentagon.png'} className="h-7" />
            </div>
          </FocusWrapper>
        </div>
        <SelectorTooltip
          options={rootNoteOptions}
          isDisplayed={displayRootNoteOptions}
          focusId="root-note-selector"
        />
      </div>
    </div>
  )
}
