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
  ['G#', 'Db', 'F#', 'B', 'D#', 'G#'],
  ['A', 'D', 'G', 'C', 'E', 'A'],
  ['A#', 'D#', 'G#', 'C#', 'F', 'A#'],
  ['B', 'E', 'A', 'D', 'F#', 'B'],
  ['C', 'F', 'A#', 'D#', 'G', 'C'],
]

export const scalesByKey: Record<Note, { [key: string]: string[] }> = {
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
    min: ['Eb', 'F', 'Gb', 'G', 'Ab', 'Bb', 'B'],
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
    min: ['Eb', 'F', 'Gb', 'G', 'Ab', 'Bb', 'B'],
  },
  E: {
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
    min: ['Gb', 'Ab', 'B', 'C#', 'Eb', 'E', 'Gb'],
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
}

export const pentatonicByKey: Record<string, { [key: string]: string[] }> = {
  C: {
    maj: ['C', 'D', 'E', 'G', 'A'],
    min: ['A#', 'C', 'D#', 'F', 'G'],
  },
  'C#': {
    maj: ['C#', 'D#', 'F', 'G#', 'A#'],
    min: ['B', 'C#', 'E', 'F#', 'A'],
  },
  Db: {
    maj: ['Db', 'Eb', 'F', 'Ab', 'Bb'],
    min: ['B', 'Db', 'E', 'F#', 'A'],
  },
  D: {
    maj: ['D', 'E', 'F#', 'A', 'B'],
    min: ['C', 'D', 'F', 'G', 'A#'],
  },
  'D#': {
    maj: ['D#', 'F', 'G', 'A#', 'C'],
    min: ['C#', 'D#', 'F#', 'G#', 'B'],
  },
  Eb: {
    maj: ['Eb', 'F', 'G', 'Bb', 'C'],
    min: ['C#', 'Eb', 'F#', 'G#', 'B'],
  },
  E: {
    maj: ['E', 'F#', 'G#', 'B', 'C#'],
    min: ['D', 'E', 'G', 'A', 'B#'],
  },
  F: {
    maj: ['F', 'G', 'A', 'C', 'D'],
    min: ['D#', 'F', 'G#', 'A#', 'C#'],
  },
  'F#': {
    maj: ['F#', 'G#', 'A#', 'C#', 'D#'],
    min: ['D#', 'F#', 'G#', 'B', 'C#'],
  },
  Gb: {
    maj: ['Gb', 'Ab', 'Bb', 'Db', 'Eb'],
    min: ['E', 'Gb', 'A', 'B', 'D'],
  },
  G: {
    maj: ['G', 'A', 'B', 'D', 'E'],
    min: ['F', 'G', 'A#', 'C', 'D#'],
  },
  'G#': {
    maj: ['G#', 'A#', 'C', 'D#', 'F'],
    min: ['F#', 'G#', 'A#', 'C#', 'E'],
  },
  Ab: {
    maj: ['Ab', 'Bb', 'C', 'Eb', 'F'],
    min: ['G', 'Ab', 'B', 'Db', 'E'],
  },
  A: {
    maj: ['A', 'B', 'C#', 'E', 'F#'],
    min: ['G', 'A', 'C', 'D', 'E#'],
  },
  'A#': {
    maj: ['A#', 'C', 'D', 'F', 'G'],
    min: ['G#', 'A#', 'C#', 'D#', 'F#'],
  },
  Bb: {
    maj: ['Bb', 'C', 'D', 'F', 'G'],
    min: ['G#', 'Bb', 'C#', 'D#', 'F#'],
  },
  B: {
    maj: ['B', 'C#', 'D#', 'F#', 'G#'],
    min: ['A', 'B', 'D', 'E', 'F##'],
  },
}

export const commonNotes: Note[][] = [
  ['C#', 'Db'],
  ['D#', 'Eb'],
  ['F#', 'Gb'],
  ['G#', 'Ab'],
  ['A#', 'Bb'],
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

  useEffect(() => {
    console.log(keySig.notes)
  }, [rootNote, mode])

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
