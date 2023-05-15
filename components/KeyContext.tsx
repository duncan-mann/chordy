import { createContext, useContext } from 'react'
import { useChordProgression } from '../utils/music-theory'

type TKeyContext = ReturnType<typeof useChordProgression>

export const KeyContext = createContext<TKeyContext | undefined>(undefined)

export interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any
}

export const KeyContextProvider = (props: Props) => {
  const chordProgressionState = useChordProgression()

  const value = { ...chordProgressionState }

  return <KeyContext.Provider value={value} {...props} />
}

export const useKeyContext = () => {
  const context = useContext(KeyContext)
  if (context === undefined) {
    throw new Error(`useKeyContext must be used within a KeyContextProvider.`)
  }
  return context
}
