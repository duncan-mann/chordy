import React from 'react'
import {
  chordsByKey,
  getCommonNotes,
  getNoteFromFretPosition,
} from '../utils/music-theory'
import { useKeyContext } from './KeyContext'
import { Fade } from './animations/Fade'

export const GuitarNeck = ({}) => {
  const fretPositions = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ]

  return (
    <div className="flex flex-row border border-l-8 border-white rounded-lg overflow-hidden h-40 mt-20">
      {fretPositions.map((fret) => (
        <Fret key={fret} fretPosition={fret} />
      ))}
    </div>
  )
}

const getFretWidth = (position: number): string | undefined => {
  if (position <= 4) return 'w-[90px]'
  if (position <= 8) return 'w-[82px]'
  if (position <= 12) return 'w-[67px]'
  if (position <= 16) return 'w-[57px]'
  if (position <= 20) return 'w-[50px]'
}

const Fret = ({ fretPosition }: { fretPosition: number }) => {
  const singleDotFrets = [2, 4, 6, 8, 14, 16, 18]

  return (
    <div className={`border-white ${getFretWidth(fretPosition)}`}>
      <div className="relative border-white border-x  border-b-2 border-b-slate-300  border-t-slate-300 w-full h-3 flex flex-row justify-center items-end z-0">
        <NoteDot stringIdx={0} {...{ fretPosition }} />
      </div>
      <div className="relative border-white border-x border-b-2  border-b-slate-300  border-t-slate-300 w-full h-6 flex justify-center items-center z-0">
        <NoteDot stringIdx={1} {...{ fretPosition }} />
      </div>
      <div className="relative border-white border-x border-b-2 border-b-slate-300  border-t-slate-300 w-full h-7 flex justify-center items-center z-0">
        <NoteDot stringIdx={2} {...{ fretPosition }} />
        {fretPosition === 11 && <FretDot />}
      </div>
      <div className="relative border-white border-x border-b-2 border-t-slate-300 w-full h-7 flex justify-center items-center z-0">
        <NoteDot stringIdx={3} {...{ fretPosition }} />
        {singleDotFrets.includes(fretPosition) && <FretDot />}
      </div>
      <div className="relative border-white border-x border-b-2 w-full h-7 flex justify-center items-center z-0">
        <NoteDot stringIdx={4} {...{ fretPosition }} />
        {fretPosition === 11 && <FretDot />}
      </div>
      <div className="relative border-slate-200 border-x border-b-4  w-full h-7 flex justify-center items-center z-0">
        <NoteDot stringIdx={5} {...{ fretPosition }} />
      </div>
      <div className="relative border-slate-200 border-x w-full h-5 z-0" />
    </div>
  )
}

const FretDot = () => (
  <div
    className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white`}
  />
)

const NoteDot = ({
  stringIdx,
  fretPosition,
}: {
  stringIdx: number
  fretPosition: number
}) => {
  const { rootNote, mode } = useKeyContext()
  const note = getNoteFromFretPosition(stringIdx, fretPosition)
  const commonNotes = getCommonNotes(note) as string[]
  const notesInKey = chordsByKey[rootNote][mode].map((chord) =>
    chord.replace('m', '').replace('o', '')
  )
  const bgColor = note === rootNote ? ' bg-sky-600' : 'bg-sky-300'

  const isInKey = () => {
    for (const note of notesInKey) {
      if (commonNotes.includes(note)) return true
    }
    return false
  }

  if (!isInKey()) return null

  return (
    <Fade key={`${note}-${rootNote}-${mode}`}>
      <div
        className={`rounded-full w-5 h-5 translate-y-3 z-40 ${bgColor} flex items-center justify-center`}
        onClick={() => {
          console.log('Note:', note, 'Note in key:', notesInKey)
        }}
      >
        <p className="font-inter text-xs text-center text-white">{note}</p>
      </div>
    </Fade>
  )
}
