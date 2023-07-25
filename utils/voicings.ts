import { ChordMode, Note } from '../types/chords'

export interface Voicing {
  id: string
  cagedShaped: 'C' | 'A' | 'G' | 'E' | 'D'
  chord: {
    rootNote: Note
    mode: ChordMode
  }
  positions: Array<{
    fret: number
    stringIdx: number
  }>
}
