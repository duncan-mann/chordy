import { useEffect, useState } from 'react'
import {
  ChordMode,
  KeyMode,
  MajorRomanChord,
  MinorRomanChord,
  Note,
  ScaleType,
} from '../types/chords'
import { Chord, KeySignature, getChordNotes } from './get-chord'
import { Scale } from 'tone'

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

export const FRET_NOTES: Note[][] = [
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
  ['A#', 'B', 'E', 'A', 'C#', 'A#'],
  ['G', 'C', 'F', 'A#', 'D', 'G'],
  ['G#', 'C#', 'F#', 'B', 'D#', 'G#'],
  ['A', 'D', 'G', 'C', 'E', 'A'],
  ['A#', 'Eb', 'G#', 'C#', 'F', 'A#'],
  ['B', 'E', 'A', 'D', 'F#', 'B'],
  ['C', 'F', 'A#', 'D#', 'G', 'C'],
  ['C#', 'F#', 'B', 'E', 'G#', 'C#'],
  ['D', 'G', 'C', 'F', 'A', 'D'],
  ['D#', 'G#', 'C#', 'F#', 'A#', 'D#'],
  ['E', 'A', 'D', 'G', 'B', 'E'],
  ['F', 'A#', 'D#', 'G#', 'C', 'F'],
  ['A#', 'B', 'E', 'A', 'C#', 'A#'],
  ['G', 'C', 'F', 'A#', 'D', 'G'],
  ['G#', 'Db', 'F#', 'B', 'D#', 'G#'],
  ['A', 'D', 'G', 'C', 'E', 'A'],
  ['A#', 'D#', 'G#', 'C#', 'F', 'A#'],
  ['B', 'E', 'A', 'D', 'F#', 'B'],
  ['C', 'F', 'A#', 'D#', 'G', 'C'],
]

export const chordsByKey: Record<string, { [key: string]: string[] }> = {
  C: {
    maj: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bo'],
    min: ['Cm', 'Do', 'Eb', 'Fm', 'Gm', 'Ab', 'Bb'],
  },
  'C#': {
    maj: ['C#', 'D#m', 'Fm', 'F#', 'G#', 'A#m', 'Co'],
    min: ['C#m', 'D#o', 'E', 'F#m', 'G#m', 'A', 'B'],
  },
  Db: {
    maj: ['Db', 'Ebm', 'Fm', 'Gb', 'Ab', 'Bbm', 'Co'],
    min: ['Ebm', 'Fo', 'Gb', 'Gbm', 'Abm', 'Bb', 'B'],
  },
  D: {
    maj: ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#o'],
    min: ['Dm', 'Eo', 'F', 'Gm', 'Am', 'Bb', 'C'],
  },
  'D#': {
    maj: ['D#', 'Fm', 'Gm', 'G#', 'A#', 'Cm', 'Do'],
    min: ['D#m', 'Fo', 'Gb', 'G#m', 'A#m', 'B', 'C#'],
  },
  Eb: {
    maj: ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm', 'Do'],
    min: ['Ebm', 'Fo', 'Gb', 'Gbm', 'Abm', 'Bb', 'B'],
  },
  E: {
    maj: ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#o'],
    min: ['Em', 'F#o', 'G', 'Am', 'Bm', 'C', 'D'],
  },
  F: {
    maj: ['F', 'Gm', 'Am', 'Bbm', 'C', 'Dm', 'Eo'],
    min: ['Fm', 'Go', 'Ab', 'Bbm', 'Cm', 'Db', 'Eb'],
  },
  'F#': {
    maj: ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m', 'Fo'],
    min: ['F#m', 'G#o', 'A', 'Bm', 'C#m', 'D', 'E'],
  },
  Gb: {
    maj: ['Gb', 'Abm', 'Bbm', 'B', 'Db', 'Ebm', 'Fo'],
    min: ['Gbm', 'Abo', 'B', 'C#m', 'Ebm', 'E', 'Gb'],
  },
  G: {
    maj: ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#o'],
    min: ['Gm', 'Ao', 'Bb', 'Cm', 'Dm', 'Eb', 'F'],
  },
  'G#': {
    maj: ['G#', 'A#m', 'Cm', 'C#', 'D#', 'Fm', 'Go'],
    min: ['G#m', 'A#o', 'B', 'C#m', 'D#m', 'E', 'F#'],
  },
  Ab: {
    maj: ['Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm', 'Go'],
    min: ['Abm', 'Bbo', 'B', 'C#m', 'Ebm', 'E', 'Gb'],
  },
  A: {
    maj: ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#o'],
    min: ['Am', 'Bo', 'C', 'Dm', 'Em', 'F', 'G'],
  },
  'A#': {
    maj: ['A#', 'Cm', 'Dm', 'D#', 'F', 'Gm', 'Ao'],
    min: ['A#m', 'Co', 'C#', 'D#m', 'Fm', 'Gb', 'G#'],
  },
  Bb: {
    maj: ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Ao'],
    min: ['Bbm', 'Co', 'Db', 'Ebm', 'Fm', 'Gb', 'Ab'],
  },
  B: {
    maj: ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#o'],
    min: ['Bm', 'C#o', 'D', 'Em', 'F#m', 'G', 'A'],
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

export const getLetteredChords = (
  progression: number[],
  rootNote: Note,
  mode: ChordMode
) => {
  const keyChords = chordsByKey[rootNote][mode]
  return progression.map((idx) => keyChords[idx])
}

export const getNoteFromFretPosition = (string: number, fret: number) =>
  FRET_NOTES[fret][string]

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
