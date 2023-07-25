import { ChordMode, KeyMode, Note } from '../types/chords'
import { getCommonNotes, getGuitarFretNotes, scalesByKey } from './music-theory'
import { Note as TonalNote } from 'tonal'

const getFlatOrSharpNotes = (rootNote: Note): Note[] =>
  rootNote.includes('b')
    ? ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
    : ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

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
  const rootNote = evaluateTheoreticalNotes(note)
  const chromaticScale = getFlatOrSharpNotes(rootNote)
  const rootNoteIndex = chromaticScale.indexOf(rootNote)

  switch (mode) {
    case 'maj':
      return [
        chromaticScale[rootNoteIndex],
        chromaticScale[(rootNoteIndex + 4) % 12],
        chromaticScale[(rootNoteIndex + 7) % 12],
      ]
    case 'min':
      return [
        chromaticScale[rootNoteIndex],
        chromaticScale[(rootNoteIndex + 3) % 12],
        chromaticScale[(rootNoteIndex + 7) % 12],
      ]
    case 'dim':
      return [
        chromaticScale[rootNoteIndex],
        chromaticScale[(rootNoteIndex + 3) % 12],
        chromaticScale[(rootNoteIndex + 6) % 12],
      ]
    default:
      throw new Error(`Invalid harmonic mode: ${mode}`)
  }
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
}

export class KeySignature {
  rootNote: Note
  mode: KeyMode
  notes: Note[]
  chords: Chord[]
  pentatonicScale: Note[]
  guitarNotes: Note[][]

  constructor(rootNote: Note, mode: KeyMode) {
    this.rootNote = rootNote
    this.mode = mode
    this.notes = getScaleNotes(rootNote, mode)
    this.pentatonicScale = getPentatonicScale(rootNote, mode)
    this.guitarNotes = getGuitarFretNotes(rootNote, mode)
    this.chords = this.notes.map((note, idx) => {
      const chordMode = chordModes[mode]
      return new Chord(note, chordMode[idx])
    })
  }

  public getNotePosition(note: Note) {
    const tnote = TonalNote.enharmonic(note) as Note
    let position = this.notes.indexOf(note) || this.notes.indexOf(tnote)
    if (position === -1) return null
    return position + 1
  }
}
