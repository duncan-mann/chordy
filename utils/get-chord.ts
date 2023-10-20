import { AdvancedChords, ChordMode, KeyMode, Note } from '../types/chords'
import { getCommonNotes, getGuitarFretNotes, scalesByKey } from './music-theory'
import {
  Scale,
  Note as TonalNote,
  Chord as TonalChord,
  ScaleType as TScaleType,
} from 'tonal'
import { ScaleType } from '../types/chords'

type TonalScale = ReturnType<(typeof Scale)['get']>
type TonalChord = ReturnType<(typeof TonalChord)['get']>['type']

const getScaleNotes = (rootNote: Note, mode: KeyMode): Note[] =>
  scalesByKey[rootNote][mode] as Note[]

const evaluateTheoreticalNotes = (note: Note): Note => {
  switch (note) {
    case 'E#':
      return 'F'
    case 'Fb':
      return 'E'
    case 'B#':
      return 'C'
    case 'Cb':
      return 'B'
    default:
      return note
  }
}

export const getChordNotes = (note: Note, mode: ChordMode): Note[] => {
  return TonalChord.get(`${note}${mode}`).notes as Note[]
}

const getPentatonicScale = (note: Note, mode: KeyMode): Note[] => {
  const rootNote = evaluateTheoreticalNotes(note)
  const notes = scalesByKey[rootNote][mode]
  const rootNoteIndex = notes.indexOf(rootNote)

  const intervals: Record<KeyMode, number[]> = {
    maj: [0, 1, 2, 4, 5],
    min: [0, 2, 3, 4, 6],
  }

  const pentatonicNotes = intervals[mode].map((interval) => {
    const noteIndex = (rootNoteIndex + interval) % 12
    return notes[noteIndex]
  })

  return pentatonicNotes
}

const getBluesScale = (note: Note, mode: KeyMode): Note[] => {
  const rootNote = evaluateTheoreticalNotes(note)
  switch (mode) {
    case 'maj':
      return Scale.get(`${rootNote} major blues`).notes as Note[]
    case 'min':
      return Scale.get(`${rootNote} minor blues`).notes as Note[]
  }
}

const getAvancedScales = (rootNote: Note) => {
  const scaleNames = [
    'major blues',
    'minor blues',
    'diminished',
    'dorian',
    'lydian',
    'mixolydian',
    'phrygian',
    'locrian',
  ] as const

  let scales: Record<string, TonalScale> = {}
  for (let i = 0; i < scaleNames.length; i++) {
    const scale = scaleNames[i]
    scales[stringToCamelCase(scale)] = Scale.get(`${rootNote} ${scale}`)
  }
  return scales
}

const stringToCamelCase = (str: string) =>
  str
    .split(' ')
    .map((word, idx) =>
      idx !== 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
    )
    .join('')

const chordModes: Record<KeyMode, ChordMode[]> = {
  maj: ['maj', 'min', 'min', 'maj', 'maj', 'min', 'dim'],
  min: ['min', 'dim', 'maj', 'min', 'min', 'maj', 'maj'],
}

export class Chord {
  rootNote: Note
  mode: ChordMode
  notes: Note[]

  constructor(rootNote: Note, mode: ChordMode) {
    this.rootNote = rootNote
    this.mode = mode
    this.notes = getChordNotes(rootNote, mode)
  }

  public getNotePosition(note: Note) {
    const tnote = TonalNote.enharmonic(note) as Note
    let position =
      this.notes.indexOf(note) > -1
        ? this.notes.indexOf(note)
        : this.notes.indexOf(tnote)
    if (position === -1) return null
    switch (position) {
      case 0:
        return 1
      case 1:
        return 3
      case 2:
        return 5
    }
  }

  public isNoteInChord(note: Note) {
    return this.notes.some((chordNote) =>
      getCommonNotes(note).includes(chordNote)
    )
  }
}

export class KeySignature {
  rootNote: Note
  mode: KeyMode
  guitarNotes: Note[][]
  advancedScales: Record<string, TonalScale>
  chords: Chord[]
  scales: Record<ScaleType, Note[]>

  constructor(rootNote: Note, mode: KeyMode) {
    this.rootNote = rootNote
    this.mode = mode
    this.scales = {
      base: getScaleNotes(rootNote, mode),
      pentatonic: getPentatonicScale(rootNote, mode),
      blues: getBluesScale(rootNote, mode),
    }
    this.guitarNotes = getGuitarFretNotes(rootNote, mode)
    this.advancedScales = getAvancedScales(this.rootNote)
    this.chords = this.scales.base.map((note, idx) => {
      const chordMode = chordModes[mode]
      return new Chord(note, chordMode[idx])
    })
  }

  public getNotePosition(note: Note) {
    const tnote = TonalNote.enharmonic(note) as Note
    let position =
      this.scales.base.indexOf(note) > -1
        ? this.scales.base.indexOf(note)
        : this.scales.base.indexOf(tnote)
    if (position === -1) return null
    return position + 1
  }
}
