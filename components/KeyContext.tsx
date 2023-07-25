import { createContext, useContext, useState } from 'react'
import { useChordProgression } from '../utils/music-theory'
import useWindowDimensions from '../utils/hooks/useWindowDimensions'

type TKeyContext = ReturnType<typeof useChordProgression> &
  ReturnType<typeof useLayout> &
  ReturnType<typeof useWindowDimensions>

export const KeyContext = createContext<TKeyContext | undefined>(undefined)

export interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any
}

export const KeyContextProvider = (props: Props) => {
  const chordProgressionState = useChordProgression()
  const layoutState = useLayout()
  const windowSizeState = useWindowDimensions()

  const value = { ...chordProgressionState, ...layoutState, ...windowSizeState }

  return <KeyContext.Provider value={value} {...props} />
}

export const useKeyContext = () => {
  const context = useContext(KeyContext)
  if (context === undefined) {
    throw new Error(`useKeyContext must be used within a KeyContextProvider.`)
  }
  return context
}

const useLayout = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  const [displayRootNoteOptions, setDisplayRootNoteOptions] = useState(false)

  return {
    sidebarIsOpen,
    setSidebarIsOpen,
    displayRootNoteOptions,
    setDisplayRootNoteOptions,
  }
}
