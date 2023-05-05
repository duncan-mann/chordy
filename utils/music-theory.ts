import { useState } from 'react'
import {
  MajorRomanChord,
  MinorRomanChord,
  Mode,
  Note,
  ScaleType,
} from '../types/chords'

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
  ['F', 'C', 'Ab', 'Eb', 'Bb', 'F'],
  ['F#', 'C#', 'A', 'E', 'B', 'F#'],
  ['G', 'D', 'Bb', 'F', 'C', 'G'],
  ['G#', 'D#', 'B', 'F#', 'C#', 'G#'],
  ['A', 'E', 'C', 'G', 'D', 'A'],
  ['A#', 'F', 'C#', 'G#', 'D#', 'A#'],
  ['B', 'F#', 'D', 'A', 'E', 'B'],
  ['C', 'G', 'Eb', 'Bb', 'F', 'C'],
  ['C#', 'G#', 'E', 'B', 'F#', 'C#'],
  ['D', 'A', 'F', 'C', 'G', 'D'],
  ['D#', 'A#', 'F#', 'C#', 'G#', 'D#'],
  ['E', 'B', 'G', 'D', 'A', 'E'],
  ['F', 'C', 'G#', 'D#', 'A#', 'F'],
  ['F#', 'C#', 'A', 'E', 'B', 'F#'],
  ['G', 'D', 'Bb', 'F', 'C', 'G'],
  ['G#', 'D#', 'B', 'F#', 'C#', 'G#'],
  ['A', 'E', 'C', 'G', 'D', 'A'],
  ['A#', 'F', 'C#', 'G#', 'D#', 'A#'],
  ['B', 'F#', 'D', 'A', 'E', 'B'],
  ['C', 'G', 'Eb', 'Bb', 'F', 'C'],
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
  maj: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'VIIo'],
  min: ['i', 'iio', 'III', 'iv', 'v', 'VI', 'VII'],
}

export const getRomanChords = (progression: number[], mode: Mode) =>
  progression.map((idx) => romanChords[mode][idx])

export const getLetteredChords = (
  progression: number[],
  rootNote: Note,
  mode: Mode
) => {
  const keyChords = chordsByKey[rootNote][mode]
  return progression.map((idx) => keyChords[idx])
}

export const getNoteFromFretPosition = (string: number, fret: number) =>
  FRET_NOTES[fret][string]

export const useChordProgression = () => {
  const [numberedChords, setNumberedChords] = useState([0, 1, 2, 3])
  const [rootNote, setRootNote] = useState<Note>('C')
  const [mode, setMode] = useState<Mode>('maj')
  const [scaleType, setScaleType] = useState<ScaleType>('base')

  const romanChords = getRomanChords(numberedChords, mode)
  const letterChords = getLetteredChords(numberedChords, rootNote, mode)
  const chords = {
    romanNumerals: getRomanChords(numberedChords, mode),
    lettered: getLetteredChords(numberedChords, rootNote, mode),
  }

  return {
    romanChords,
    letterChords,
    chords,
    setNumberedChords,
    rootNote,
    setRootNote,
    mode,
    setMode,
    scaleType,
    setScaleType,
  }
}
