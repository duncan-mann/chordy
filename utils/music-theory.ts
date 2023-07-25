import { useEffect, useState } from 'react'
import {
  ChordMode,
  KeyMode,
  MajorRomanChord,
  MinorRomanChord,
  Note,
  ScaleType,
} from '../types/chords'
import { Chord, KeySignature } from './get-chord'

export const notes: Note[] = [
  'C',
  'C#',
  'Db',
  'D',
  'D#',
  'Eb',
  'E',
  'F',
  'F#',
  'Gb',
  'G',
  'G#',
  'Ab',
  'A',
  'A#',
  'Bb',
  'B',
]

export const FLAT_FRET_NOTES: Note[][] = [
  ['E', 'A', 'D', 'G', 'B', 'E'],
  ['F', 'Bb', 'Eb', 'Ab', 'C', 'F'],
  ['Gb', 'B', 'E', 'A', 'Db', 'Gb'],
  ['G', 'C', 'F', 'Bb', 'D', 'G'],
  ['Ab', 'Db', 'Gb', 'B', 'Eb', 'Ab'],
  ['A', 'D', 'G', 'C', 'E', 'A'],
  ['Bb', 'Eb', 'Ab', 'Db', 'F', 'Bb'],
  ['B', 'E', 'A', 'D', 'Gb', 'B'],
  ['C', 'F', 'Bb', 'Eb', 'G', 'C'],
  ['Db', 'Gb', 'B', 'E', 'Ab', 'Db'],
  ['D', 'G', 'C', 'F', 'A', 'D'],
  ['Eb', 'Ab', 'Db', 'Gb', 'Bb', 'Eb'],
  ['E', 'A', 'D', 'G', 'B', 'E'],
  ['F', 'Bb', 'Eb', 'Ab', 'C', 'F'],
  ['Gb', 'B', 'E', 'A', 'Db', 'Gb'],
  ['G', 'C', 'F', 'Bb', 'D', 'G'],
  ['Ab', 'Db', 'Gb', 'B', 'Eb', 'Ab'],
  ['A', 'D', 'G', 'C', 'E', 'A'],
  ['Bb', 'Eb', 'Ab', 'Db', 'F', 'Bb'],
  ['B', 'E', 'A', 'D', 'Gb', 'B'],
  ['C', 'F', 'Bb', 'Eb', 'G', 'C'],
]

export const SHARP_FRET_NOTES: Note[][] = [
  ['E', 'A', 'D', 'G', 'B', 'E'],
  ['F', 'A#', 'D#', 'G#', 'C', 'F'],
  ['F#', 'B', 'E', 'A', 'C#', 'F#'],
  ['G', 'C', 'F', 'A#', 'D', 'G'],
  ['G#', 'C#', 'F#', 'B', 'D#', 'G#'],
  ['A', 'D', 'G', 'C', 'E', 'A'],
  ['A#', 'D#', 'G#', 'C#', 'F', 'A#'],
  ['B', 'E', 'A', 'D', 'F#', 'B'],
  ['C', 'F', 'A#', 'D#', 'G', 'C'],
  ['C#', 'F#', 'B', 'E', 'G#', 'C#'],
  ['D', 'G', 'C', 'F', 'A', 'D'],
  ['D#', 'G#', 'C#', 'F#', 'A#', 'D#'],
  ['E', 'A', 'D', 'G', 'B', 'E'],
  ['F', 'A#', 'D#', 'G#', 'C', 'F'],
  ['F#', 'B', 'E', 'A', 'C#', 'F#'],
  ['G', 'C', 'F', 'A#', 'D', 'G'],
  ['G#', 'C#', 'F#', 'B', 'D#', 'G#'],
  ['A', 'D', 'G', 'C', 'E', 'A'],
  ['A#', 'D#', 'G#', 'C#', 'F', 'A#'],
  ['B', 'E', 'A', 'D', 'F#', 'B'],
  ['C', 'F', 'A#', 'D#', 'G', 'C'],
]

const fretNoteMapBySharpOrFlat = {
  '#': SHARP_FRET_NOTES,
  b: FLAT_FRET_NOTES,
} as const

export const getGuitarFretNotes = (rootNote: Note, mode: KeyMode) =>
  fretNoteMapBySharpOrFlat[fretboardTypeByKey[rootNote][mode]]

export const scalesByKey: Record<Note, { [key: string]: Note[] }> = {
  Cb: {
    maj: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
    min: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'],
  },
  C: {
    maj: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    min: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
  },
  'C#': {
    maj: ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C'],
    min: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'],
  },
  Db: {
    maj: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
    min: ['Db', 'Eb', 'Fb', 'Gb', 'A', 'A', 'Cb'],
  },
  D: {
    maj: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
    min: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'],
  },
  'D#': {
    maj: ['D#', 'F', 'G', 'G#', 'A#', 'C', 'D'],
    min: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#'],
  },
  Eb: {
    maj: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
    min: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'B', 'Db'],
  },
  E: {
    maj: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
    min: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
  },
  //TO_DO - FIGURE OUT E# AND B#
  'E#': {
    maj: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    min: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'],
  },
  Fb: {
    maj: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
    min: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
  },
  F: {
    maj: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    min: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'],
  },
  'F#': {
    maj: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E'],
    min: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'],
  },
  Gb: {
    maj: ['Gb', 'Ab', 'Bb', 'B', 'Db', 'Eb', 'E'],
    min: ['Gb', 'Ab', 'A', 'B', 'Db', 'D', 'E'],
  },
  G: {
    maj: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    min: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'],
  },
  'G#': {
    maj: ['G#', 'A#', 'C', 'C#', 'D#', 'F', 'G'],
    min: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#'],
  },
  Ab: {
    maj: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
    min: ['Ab', 'Bb', 'B', 'C#', 'Eb', 'E', 'Gb'],
  },
  A: {
    maj: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
    min: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  },
  'A#': {
    maj: ['A#', 'C', 'D', 'D#', 'F', 'G', 'A'],
    min: ['A#', 'C', 'C#', 'D#', 'F', 'Gb', 'G#'],
  },
  Bb: {
    maj: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
    min: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab'],
  },
  B: {
    maj: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
    min: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'],
  },
  'B#': {
    maj: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    min: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
  },
}

export const fretboardTypeByKey: Record<Note, { [key: string]: 'b' | '#' }> = {
  Cb: {
    maj: '#',
    min: '#',
  },
  C: {
    maj: '#',
    min: 'b',
  },
  'C#': {
    maj: '#',
    min: '#',
  },
  Db: {
    maj: 'b',
    min: 'b',
  },
  D: {
    maj: '#',
    min: 'b',
  },
  'D#': {
    maj: '#',
    min: '#',
  },
  Eb: {
    maj: 'b',
    min: 'b',
  },
  E: {
    maj: '#',
    min: '#',
  },
  //TO_DO - FIGURE OUT E# AND B#
  'E#': {
    maj: '#',
    min: '#',
  },
  Fb: {
    maj: '#',
    min: '#',
  },
  F: {
    maj: 'b',
    min: 'b',
  },
  'F#': {
    maj: '#',
    min: '#',
  },
  Gb: {
    maj: 'b',
    min: 'b',
  },
  G: {
    maj: '#',
    min: 'b',
  },
  'G#': {
    maj: '#',
    min: '#',
  },
  Ab: {
    maj: 'b',
    min: 'b',
  },
  A: {
    maj: '#',
    min: '#',
  },
  'A#': {
    maj: '#',
    min: '#',
  },
  Bb: {
    maj: 'b',
    min: 'b',
  },
  B: {
    maj: '#',
    min: '#',
  },
  'B#': {
    maj: '#',
    min: '#',
  },
}

export const commonNotes: Note[][] = [
  ['C#', 'Db'],
  ['D#', 'Eb'],
  ['F#', 'Gb'],
  ['G#', 'Ab'],
  ['A#', 'Bb'],
  ['E#', 'F'],
  ['Fb', 'E'],
  ['B#', 'C'],
  ['Cb', 'B'],
]

export const getCommonNotes = (note: Note): Note[] => {
  for (const notes of commonNotes) {
    if (notes.includes(note)) {
      return notes
    }
  }
  return [note]
}

export const romanChords: Record<'maj', MajorRomanChord[]> &
  Record<'min', MinorRomanChord[]> = {
  maj: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'VII°'],
  min: ['i', 'II°', 'III', 'iv', 'v', 'VI', 'VII'],
}

export const getRomanChords = (mode: KeyMode, progression?: number[]) => {
  if (progression) return progression.map((idx) => romanChords[mode][idx])
  return romanChords[mode]
}

export const getChordMode = (chord: string) => {
  if (chord.includes('m')) return 'min'
  if (chord.includes('o')) return 'dim'
  return 'maj'
}

export const useChordProgression = () => {
  const [numberedChords, setNumberedChords] = useState()
  const [rootNote, setRootNote] = useState<Note>('C')
  const [activeChord, setActiveChord] = useState<Chord>()
  const [mode, setMode] = useState<KeyMode>('maj')
  const [scaleType, setScaleType] = useState<ScaleType>('base')

  const resetState = () => {
    setScaleType('base')
    setActiveChord(undefined)
  }

  const romanChords = getRomanChords(mode, numberedChords)

  const chords = {
    romanNumerals: getRomanChords(mode, numberedChords),
  }
  const keySig = new KeySignature(rootNote, mode)

  return {
    keySig,
    romanChords,
    chords,
    setNumberedChords,
    rootNote,
    setRootNote,
    mode,
    setMode,
    scaleType,
    activeChord,
    setScaleType: (scaleType: ScaleType) => {
      resetState()
      setScaleType(scaleType)
    },
    setActiveChord: (chord?: Chord) => {
      resetState()
      setActiveChord(chord || undefined)
    },
  }
}

type ChordPosition = {
  stringIdx: number
  fret: number
}

type ChordShape = {
  shapeName: 'C' | 'A' | 'G' | 'E' | 'D'
  positions: ChordPosition[]
}

export type CAGEDPositions = {
  [key: string]: string[]
}
