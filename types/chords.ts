export type Note =
  | 'C'
  | 'C#'
  | 'Db'
  | 'D'
  | 'D#'
  | 'Eb'
  | 'E'
  | 'F'
  | 'F#'
  | 'Gb'
  | 'G'
  | 'G#'
  | 'Ab'
  | 'A'
  | 'A#'
  | 'Bb'
  | 'B'

//The uppercase Roman numerals represent major chords, the lowercase Roman numerals represent minor chords,
//and the "m" suffix indicates a minor chord.
//The "7" suffix indicates a dominant 7th chord, the "6" suffix indicates an inverted major chord,
//and the "64" suffix indicates an inverted dominant chord.

export type KeyMode = 'maj' | 'min'
export type ChordMode = KeyMode | 'dim'

export type MajorRomanChord = 'I' | 'ii' | 'iii' | 'IV' | 'V' | 'vi' | 'VII°'

export type MinorRomanChord = 'i' | 'II°' | 'III' | 'iv' | 'v' | 'VI' | 'VII'

export type RomanChord = MajorRomanChord | MinorRomanChord

export type ScaleType = 'base' | 'pentatonic'
