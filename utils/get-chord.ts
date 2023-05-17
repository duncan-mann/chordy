import { ChordMode, KeyMode, Note } from '../types/chords'

const getFlatOrSharpNotes = (rootNote: Note): Note[] =>
  rootNote.includes('b')
    ? ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
    : ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const getScaleNotes = (rootNote: Note, mode: KeyMode): Note[] => {
  const chromaticScale = getFlatOrSharpNotes(rootNote)
  const rootNoteIndex = chromaticScale.indexOf(rootNote)
  if (rootNoteIndex === -1) {
    throw new Error(`Invalid root note: ${rootNote}`)
  }

  let scaleIntervals: number[]
  if (mode === 'maj') {
    scaleIntervals = [0, 2, 4, 5, 7, 9, 11]
  } else if (mode === 'min') {
    scaleIntervals = [0, 2, 3, 5, 7, 8, 10]
  } else {
    throw new Error(`Invalid mode: ${mode}`)
  }

  const scaleNotes = scaleIntervals.map(
    (interval) => chromaticScale[(rootNoteIndex + interval) % 12]
  )

  return scaleNotes
}

export const getChordNotes = (rootNote: Note, mode: ChordMode): Note[] => {
  const chromaticScale = getFlatOrSharpNotes(rootNote)
  const rootNoteIndex = chromaticScale.indexOf(rootNote)
  if (rootNoteIndex === -1) {
    throw new Error(`Invalid root note: ${rootNote}`)
  }

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

const getPentatonicScale = (rootNote: Note, mode: KeyMode): Note[] => {
  const notes = getFlatOrSharpNotes(rootNote)
  const rootNoteIndex = notes.indexOf(rootNote)
  if (rootNoteIndex === -1) {
    throw new Error('Invalid root note')
  }

  const intervals: Record<KeyMode, number[]> = {
    maj: [0, 2, 4, 7, 9],
    min: [0, 3, 5, 7, 10],
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
}

export class KeySignature {
  rootNote: Note
  mode: KeyMode
  notes: Note[]
  chords: Chord[]
  pentatonicScale: Note[]

  constructor(rootNote: Note, mode: KeyMode) {
    this.rootNote = rootNote
    this.mode = mode
    this.notes = getScaleNotes(rootNote, mode)
    this.pentatonicScale = getPentatonicScale(rootNote, mode)
    this.chords = this.notes.map((note, idx) => {
      const chordMode = chordModes[mode]
      return new Chord(note, chordMode[idx])
    })
  }
}
