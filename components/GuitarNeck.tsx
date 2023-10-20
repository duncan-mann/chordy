import React from 'react'

import { getCommonNotes } from '../utils/music-theory'
import { useKeyContext } from './KeyContext'
import { Note } from '../types/chords'
import { getCAGEDColors, getCAGEDPosition } from '../utils/hooks/useCAGEDShapes'
import { Chord } from '../utils/get-chord'
import { Fade } from './animations/Fade'

export const GuitarNeck = () => {
  const { width } = useKeyContext()

  const fretPositions = [
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
    ...(width && width > 850 ? [12, 13, 14, 15, 16, 17, 18, 19, 20] : []),
  ]

  return (
    <div className="flex flex-row flex-nowrap border-slate-800 rounded-lg overflow-hidden h-40 w-min">
      <OpenStringNoteDots />
      {fretPositions.map((fret) => (
        <Fret key={fret} fretPosition={fret} />
      ))}
    </div>
  )
}

const Fret = ({ fretPosition }: { fretPosition: number }) => {
  const singleDotFrets = [3, 5, 7, 9, 15, 17, 19, 21]
  const leftFretThickness = fretPosition === 1 ? 'border-l-8' : ''

  return (
    <div
      className={`border-slate-800  inline-block ${getFretWidth(fretPosition)}`}
    >
      <div
        className={`relative border-slate-800 border-b-2 border-b-slate-600 w-full h-3 flex flex-row justify-center items-end`}
      >
        <NoteDot stringIdx={5} {...{ fretPosition }} />
      </div>
      <div
        className={`relative border-slate-800 border-r border-b-2  border-b-slate-600  border-t-slate-600 w-full h-7 flex justify-center items-center ${leftFretThickness}`}
      >
        <NoteDot stringIdx={4} {...{ fretPosition }} />
      </div>
      <div
        className={`relative border-slate-800 border-r border-b-2 border-b-slate-600  border-t-slate-600 w-full h-7 flex justify-center items-center ${leftFretThickness}`}
      >
        <NoteDot stringIdx={3} {...{ fretPosition }} />
        {fretPosition === 12 && <FretDot />}
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
        {fretPosition === 12 && <FretDot />}
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
  openString?: boolean
}) => {
  const { rootNote, activeChord, keySig, scaleType } = useKeyContext()
  const isOpenString = fretPosition === 0

  const note = keySig.guitarNotes[fretPosition][stringIdx]
  const notePosition = activeChord
    ? activeChord.getNotePosition(note)
    : keySig.getNotePosition(note)

  const cagedPosition = getCAGEDPosition(stringIdx, notePosition)

  //TO BE SET IN PREMIUM MODE
  const CAGED_FEATURE_ON = false
  const isNonRootNoteOpenString = isOpenString && note !== rootNote
  const bgColors = CAGED_FEATURE_ON
    ? getCAGEDColors(cagedPosition)
    : isNonRootNoteOpenString
    ? 'white'
    : getStandardColors({ note, chord: activeChord, stringIdx })

  const textColor = isNonRootNoteOpenString ? 'text-slate-900' : 'text-white'
  const border = isNonRootNoteOpenString ? 'border-2 border-slate-900' : ''

  if (
    !getShouldDisplayNote({
      note,
      chord: activeChord,
      scale: keySig.scales[scaleType],
    })
  ) {
    return null
  }

  return (
    <Fade key={`${stringIdx}-${fretPosition}`}>
      <div>
        <div
          className={`rounded-full w-5 h-5 translate-y-3 relative flex items-center justify-center overflow-hidden ${border}`}
        >
          <div
            className={`absolute w-full h-full rounded-full ${bgColors[0]}`}
          />
          <div
            className={`absolute w-1/2 h-full transform translate-x-2/4 ${
              bgColors[1] || bgColors[0]
            }`}
          />
          <p
            className={`font-poppins font-bold absolute ${textColor} text-xs text-center cursor-default`}
          >
            {note}
          </p>
        </div>
      </div>
    </Fade>
  )
}

const OpenStringNoteDots = () => {
  const strings = [5, 4, 3, 2, 1, 0]
  return (
    <div className="mr-1 -translate-y-3">
      {strings.map((stringIdx) => {
        const height = stringIdx === 5 ? 'h-6' : 'h-7'
        const mb = stringIdx === 5 ? 'mb-1' : ''
        return (
          <div key={stringIdx} className={`${height} ${mb}`}>
            <NoteDot stringIdx={stringIdx} fretPosition={0} />
          </div>
        )
      })}
    </div>
  )
}

const getFretWidth = (position: number): string | undefined => {
  if (position <= 4) return 'w-[87px]'
  if (position <= 8) return 'w-[80px]'
  if (position <= 12) return 'w-[67px]'
  if (position <= 16) return 'w-[57px]'
  if (position <= 20) return 'w-[50px]'
}

const getStandardColors = ({
  note,
  chord,
  stringIdx,
}: {
  note: Note
  chord?: Chord
  stringIdx: number
}) => {
  //Determine if note is in chord
  if (!chord) return ['bg-slate-900']
  if (chord.rootNote !== note && stringIdx === 0) return ['bg-slate-900']
  return chord.isNoteInChord(note) ? ['bg-sky-500'] : ['bg-slate-900']
}

const getShouldDisplayNote = ({
  chord,
  note,
  scale,
}: {
  chord?: Chord
  note: Note
  scale: Note[]
}): boolean => {
  if (
    chord &&
    chord.notes.some((scaleNote) => getCommonNotes(note).includes(scaleNote))
  )
    return true
  if (scale.some((scaleNote) => getCommonNotes(note).includes(scaleNote)))
    return true
  return false
}
