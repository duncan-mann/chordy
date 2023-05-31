import React from 'react'

import { getCommonNotes } from '../utils/music-theory'
import { useKeyContext } from './KeyContext'
import { Fade } from './animations/Fade'
import { Note } from '../types/chords'
import { getCAGEDPosition } from '../utils/hooks/useCAGEDShapes'

export const GuitarNeck = () => {
  const { width } = useKeyContext()

  const fretPositions = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    ...(width && width > 850 ? [12, 13, 14, 15, 16, 17, 18, 19] : []),
  ]

  return (
    <div className="flex flex-row flex-nowrap border-slate-800 rounded-lg overflow-hidden h-40 w-min">
      {fretPositions.map((fret) => (
        <Fret key={fret} fretPosition={fret} />
      ))}
    </div>
  )
}

const Fret = ({ fretPosition }: { fretPosition: number }) => {
  const singleDotFrets = [2, 4, 6, 8, 14, 16, 18]
  const leftFretThickness = fretPosition === 0 ? 'border-l-8' : ''

  return (
    <div className={`border-slate-800 w-[60px] inline-block`}>
      <div
        className={`relative border-slate-800 border-b-2 border-b-slate-600 w-full h-3 flex flex-row justify-center items-end`}
      >
        <NoteDot stringIdx={5} {...{ fretPosition }} />
      </div>
      <div
        className={`relative border-slate-800 border-r border-b-2  border-b-slate-600  border-t-slate-600 w-full h-6 flex justify-center items-center ${leftFretThickness}`}
      >
        <NoteDot stringIdx={4} {...{ fretPosition }} />
      </div>
      <div
        className={`relative border-slate-800 border-r border-b-2 border-b-slate-600  border-t-slate-600 w-full h-7 flex justify-center items-center ${leftFretThickness}`}
      >
        <NoteDot stringIdx={3} {...{ fretPosition }} />
        {fretPosition === 11 && <FretDot />}
      </div>
      <div
        className={`relative border-slate-800 border-r border-b-2 border-t-slate-600 w-full h-7 flex justify-center items-center ${leftFretThickness}`}
      >
        <NoteDot stringIdx={2} {...{ fretPosition }} />
        {singleDotFrets.includes(fretPosition) && <FretDot />}
      </div>
      <div
        className={`relative border-slate-800 border-r border-b-2 w-full h-7 flex justify-center items-center ${leftFretThickness}`}
      >
        <NoteDot stringIdx={1} {...{ fretPosition }} />
        {fretPosition === 11 && <FretDot />}
      </div>
      <div
        className={`relative border-slate-800 border-r border-b-2  w-full h-7 flex justify-center items-center ${leftFretThickness}`}
      >
        <NoteDot stringIdx={0} {...{ fretPosition }} />
      </div>
      <div className={`relative border-slate-800 w-full h-5`} />
      <div className="bg-cagedc hidden" />
      <div className="bg-cageda hidden" />
      <div className="bg-cagedg hidden" />
      <div className="bg-cagede hidden" />
      <div className="bg-cagedd hidden" />
    </div>
  )
}

const FretDot = () => (
  <div
    className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-800 z-0 opacity-20`}
  />
)

const NoteDot = ({
  stringIdx,
  fretPosition,
}: {
  stringIdx: number
  fretPosition: number
}) => {
  const { rootNote, mode, activeChord, keySig, scaleType } = useKeyContext()

  const note = keySig.guitarNotes[fretPosition][stringIdx]
  const notePosition = activeChord
    ? activeChord.getNotePosition(note)
    : keySig.getNotePosition(note)

  const commonNotes = getCommonNotes(note) as string[]

  const isActiveNote = (notes: Note[]) => {
    for (const note of notes) {
      if (commonNotes.includes(note)) return true
    }
    return false
  }

  const isInActiveChord = Boolean(
    activeChord && isActiveNote(activeChord.notes)
  )

  if (scaleType === 'pentatonic' && !isActiveNote(keySig.pentatonicScale))
    return null
  else if (activeChord && !isInActiveChord) return null
  else if (!activeChord && !isActiveNote(keySig.notes)) return null

  const result = getCAGEDPosition(stringIdx, notePosition)
  const getCAGEDColors = () => {
    if (!result) return ['bg-black', 'bg-black']
    return result.map((position) => `bg-caged${position.toLowerCase()}`)
  }
  const cagedColors = getCAGEDColors()

  return (
    <Fade
      key={`${note}-${rootNote}-${mode}-${scaleType}-${activeChord?.rootNote}`}
      className={'z-10'}
    >
      <div
        className={`rounded-full w-5 h-5 translate-y-3 relative flex items-center justify-center overflow-hidden`}
      >
        <div
          className={`absolute w-full h-full rounded-full ${cagedColors[0]}`}
        />
        <div
          className={`absolute w-1/2 h-full transform translate-x-2/4 ${
            cagedColors[1] || cagedColors[0]
          }`}
        />
        <p className="font-poppins font-bold absolute text-white text-xs text-center cursor-default">
          {note}
        </p>
      </div>
    </Fade>
  )
}
