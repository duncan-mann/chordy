import { createContext, useContext, useState } from 'react'
import { useChordProgression } from '../utils/music-theory'
import { FocusId } from './animations/FocusWrapper'

type TKeyContext = ReturnType<typeof useChordProgression> &
  ReturnType<typeof useLayout> &
  ReturnType<typeof useFocusedComponenet>

export const KeyContext = createContext<TKeyContext | undefined>(undefined)

export interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any
}

export const KeyContextProvider = (props: Props) => {
  const chordProgressionState = useChordProgression()
  const layoutState = useLayout()
  const focusState = useFocusedComponenet()

  const value = { ...chordProgressionState, ...layoutState, ...focusState }

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

const useFocusedComponenet = () => {
  const [focusedIds, setFocusedId] = useState<FocusId[]>()
  return { focusedIds, setFocusedId }
}
