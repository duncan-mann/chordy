//Displays options for root note, mode

import { useState } from 'react'
import { getRandomRootNote } from '../types/chords'
import { SelectorTooltip } from './SelectorTooltip'
import { notes } from '../utils/music-theory'
import { useKeyContext } from './KeyContext'

export const MenuBar = () => {
  const [displayRootNoteOptions, setDisplayRootNoteOptions] = useState(false)
  const { setRootNote, rootNote, mode, setMode, setNumberedChords } =
    useKeyContext()

  const filteredNotes = notes.filter((note) => note !== rootNote)
  const rootNoteOptions = filteredNotes.map((note) => ({
    text: note,
    onClick: () => {
      setRootNote(note)
      setDisplayRootNoteOptions(false)
    },
  }))

  const toggleMode = () => setMode((mode) => (mode == 'maj' ? 'min' : 'maj'))
  const toggleRootNoteDisplay = () =>
    setDisplayRootNoteOptions((state) => !state)
  const setRandom = () => {
    // setNumberedChords(getRandomProgression({ chordAmount: 4 }))
    setRootNote((currrentRootNote) => getRandomRootNote(currrentRootNote))
  }

  return (
    <div className="h-40 mt-3 ml-10 flex flex-row">
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
        className="font-inter font-thin text-2xl text-white cursor-pointer mr-3"
        onClick={toggleMode}
      >
        {mode}
      </h3>
      {/* <h3
        className="font-inter font-thin text-2xl text-white cursor-pointer"
        onClick={setRandom}
      >
        Random
      </h3> */}
    </div>
  )
}
