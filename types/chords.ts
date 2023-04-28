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

export type NoteChord =
  | Note
  | 'Cm'
  | 'C#m'
  | 'Dbm'
  | 'Dm'
  | 'D#m'
  | 'Ebm'
  | 'Em'
  | 'Fm'
  | 'F#m'
  | 'Gbm'
  | 'Gm'
  | 'G#m'
  | 'Abm'
  | 'Am'
  | 'A#m'
  | 'Bbm'
  | 'Bm'
  | 'Co'
  | 'C#o'
  | 'Dbo'
  | 'Do'
  | 'D#o'
  | 'Ebo'
  | 'Eo'
  | 'Fo'
  | 'F#o'
  | 'Gbo'
  | 'Go'
  | 'G#o'
  | 'Abo'
  | 'Ao'
  | 'A#o'
  | 'Bbo'
  | 'Bo'
//The uppercase Roman numerals represent major chords, the lowercase Roman numerals represent minor chords,
//and the "m" suffix indicates a minor chord.
//The "7" suffix indicates a dominant 7th chord, the "6" suffix indicates an inverted major chord,
//and the "64" suffix indicates an inverted dominant chord.

export type Mode = 'maj' | 'min'

export type MajorRomanChord = 'I' | 'ii' | 'iii' | 'IV' | 'V' | 'vi' | 'VIIo'

export type MinorRomanChord = 'i' | 'iio' | 'III' | 'iv' | 'v' | 'VI' | 'VII'

export type RomanChord = MajorRomanChord | MinorRomanChord

export const romanChords: Record<'maj', MajorRomanChord[]> &
  Record<'min', MinorRomanChord[]> = {
  maj: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'VIIo'],
  min: ['i', 'iio', 'III', 'iv', 'v', 'VI', 'VII'],
}

export const getRandomValueFromArray = <T>(arr: T[]): T => {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

/**
 *
 * @param param0 -
 * @returns - 0-indexed chord progression. Ex. [0,3,2,1] is a 1, 4, 3, 2 progression
 */
export const generateRandomProgression = ({
  chordAmount,
}: {
  chordAmount: number
}): number[] => {
  const progression: number[] = []

  while (progression.length < chordAmount) {
    const randomNumber = Math.floor(Math.random() * 7)
    if (!progression.includes(randomNumber)) {
      progression.push(randomNumber)
    }
  }

  return progression
}

export const getProgressionForKey = (
  progression: number[],
  rootNote: string,
  mode: Mode
) => {
  const chords = chordsByKey[rootNote][mode]
  return progression.map((chordNumber) => chords[chordNumber])
}

export type Progression = {
  roman: Array<RomanChord>
  numbers: Array<string>
}

export const commonProgressions: Array<Array<RomanChord>> = [
  ['I', 'IV', 'V'],
  ['I', 'vi', 'IV', 'V'],
  ['I', 'IV', 'v'],
  ['I', 'V', 'vi', 'IV'],
  ['I', 'vi', 'iii', 'IV'],
  ['ii', 'V', 'I'],
  ['I', 'IV', 'ii', 'V'],
  ['I', 'IV', 'vi', 'V'],
  ['I', 'V', 'vi', 'iii', 'IV'],
  ['IV', 'I', 'V'],
  ['I', 'IV', 'vi', 'iii'],
  ['I', 'vi', 'IV', 'iii'],
  ['I', 'V', 'vi', 'IV'],
  ['I', 'IV', 'iv', 'IV'],
  ['I', 'V', 'IV', 'V'],
  ['I', 'IV', 'I', 'V'],
  ['I', 'IV', 'iv', 'IV', 'V'],
]
