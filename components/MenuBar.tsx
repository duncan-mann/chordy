//Displays options for root note, mode

import { useState } from 'react'
import { SelectorTooltip } from './SelectorTooltip'
import { notes } from '../utils/music-theory'
import { useKeyContext } from './KeyContext'

export const MenuBar = () => {
  const [displayRootNoteOptions, setDisplayRootNoteOptions] = useState(false)
  const {
    setRootNote,
    rootNote,
    mode,
    setMode,
    setActiveChord,
    setScaleType,
    scaleType,
  } = useKeyContext()

  const filteredNotes = notes.filter((note) => note !== rootNote)

  const togglePentatonic = () => {
    if (scaleType === 'base') return setScaleType('pentatonic')
    return setScaleType('base')
  }

  const rootNoteOptions = filteredNotes.map((note) => ({
    text: note,
    onClick: () => {
      setRootNote(note)
      setActiveChord(undefined)
      setDisplayRootNoteOptions(false)
    },
  }))

  const toggleMode = () => setMode((mode) => (mode == 'maj' ? 'min' : 'maj'))
  const toggleRootNoteDisplay = () =>
    setDisplayRootNoteOptions((state) => !state)

  return (
    <div className="h-15 mt-3 mb-28 ml-10 flex flex-row items-center">
      <h3
        className="font-inter font-thin text-4xl text-white mr-3 cursor-pointer"
        onClick={toggleRootNoteDisplay}
      >
        {rootNote}
      </h3>
      <SelectorTooltip
        options={rootNoteOptions}
        isDisplayed={displayRootNoteOptions}
      />
      <h3
        className="font-inter font-thin text-2xl text-white cursor-pointer mr-5"
        onClick={toggleMode}
      >
        {mode}
      </h3>
      <div
        className={`${
          scaleType !== 'pentatonic' && 'opacity-30'
        } cursor-pointer`}
        onClick={togglePentatonic}
      >
        <img src={'./pentagon.png'} className="h-7" />
      </div>
    </div>
  )
}
