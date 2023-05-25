import React, { PropsWithChildren } from 'react'
import { useKeyContext } from '../KeyContext'

export type FocusId =
  | 'root-note-selector'
  | 'chords'
  | 'guitar-neck'
  | 'pentatonic'

interface IFocusWrapper {
  className?: string
  id?: FocusId
}

export const FocusWrapper = ({
  children,
  className,
  id,
}: PropsWithChildren<IFocusWrapper>) => {
  const { focusedIds } = useKeyContext()
  const isFocused = id && focusedIds?.includes(id)
  if (!isFocused || !id) return <>{children}</>

  return (
    <div className={`${className} z-20`}>
      <div className={`relative focused pointer-events-none z-10`}>
        {children}
      </div>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-60  pointer-events-none z-0" />
    </div>
  )
}
