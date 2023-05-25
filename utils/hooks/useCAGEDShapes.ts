//Note position is the position in the scale
//Ex. C scale C D E F G A B
//The note position of F is 4, B is 7
type StringIndex = number
type ChordTone = number
type CagedShape = 'C' | 'A' | 'G' | 'E' | 'D'

export const getCAGEDPosition = (
  stringIdx: number,
  notePosition: number | null | undefined
) => {
  if (notePosition === null || notePosition === undefined) return null

  const positions: { [key: StringIndex]: Record<ChordTone, CagedShape[]> } = {
    5: {
      1: ['G', 'E'],
      3: ['D', 'C'],
      5: ['A'],
    },
    4: {
      1: ['D', 'C'],
      3: ['A', 'G'],
      5: ['G', 'E'],
    },
    3: {
      1: ['A', 'G'],
      3: ['E'],
      5: ['D', 'C'],
    },
    2: {
      1: ['E', 'D'],
      3: ['C'],
      5: ['A', 'G'],
    },
    1: {
      1: ['C', 'A'],
      3: ['G'],
      5: ['E'],
    },
    0: {
      1: ['G', 'E'],
    },
  }

  return positions[stringIdx]?.[notePosition] || null
}
