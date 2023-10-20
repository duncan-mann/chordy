import React from 'react'
import { useKeyContext } from '../KeyContext'
import { KeyMode, Note, ScaleType } from '../../types/chords'

export const MENU_BAR_SCREEN_SIZE = 785
const selectedStyles = 'text-white '

export const SideBar = () => {
  const whiteNotes: Note[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  const { setRootNote, setActiveChord, rootNote } = useKeyContext()

  return (
    <div className="text-slate-500 top-0 left-0 h-screen sidebar flex flex-col items-center font-poppins mr-5">
      <ScaleSelector />
      <div
        id="key-selector"
        className="flex flex-col items-center justify-center "
      >
        {whiteNotes.map((note) => {
          const isSelectedRootNote = rootNote.includes(note)
          const isSelectedFlat = isSelectedRootNote && rootNote.includes('b')
          const isSelectedSharp = isSelectedRootNote && rootNote.includes('#')
          return (
            <div className="flex flex-row items-center mb-8" key={note}>
              <p
                className={`text-lg md:text-xl hover:cursor-pointer hover:text-2xl transition ease-in-out hover:scale-110 w-5 text-center select-none
                  ${isSelectedFlat && 'text-white'}
                  `}
                onClick={() => {
                  setActiveChord(undefined)
                  if (note === 'F') return setRootNote('E')
                  if (note === 'C') return setRootNote('B')
                  setRootNote(`${note}b` as Note)
                }}
              >
                ♭
              </p>
              <p
                className={`text-2xl md:text-3xl font-poppins font-bold mx-[1vw] hover:cursor-pointer transition ease-in-out hover:scale-110 select-none
                  ${isSelectedRootNote && 'text-white'}
                  `}
                onClick={() => {
                  setActiveChord(undefined)
                  setRootNote(note)
                }}
              >
                {note}
              </p>
              <p
                className={`text-lg md:text-xl hover:cursor-pointer hover:text-2xl transition ease-in-out hover:scale-110 w-5 text-center select-none
                  ${isSelectedSharp && 'text-white'}
                  `}
                onClick={() => {
                  setActiveChord(undefined)
                  if (note === 'B') return setRootNote('C')
                  if (note === 'E') return setRootNote('F')
                  setRootNote(`${note}#` as Note)
                }}
              >
                ♯
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ScaleSelector = () => {
  const { mode, setActiveChord, setMode, scaleType, setScaleType } =
    useKeyContext()
  const isSelected = (type: 'maj' | 'min') => type === mode
  const toggleScaleType = (newScaleType: ScaleType) => {
    if (newScaleType !== scaleType) return setScaleType(newScaleType)
    return setScaleType('base')
  }

  return (
    <div className="flex flex-col mt-10 mb-5">
      {(['maj', 'min'] as KeyMode[]).map((mode) => (
        <div
          key={mode}
          className={`${
            isSelected(mode) && selectedStyles
          } text-left cursor-pointer select-none mb-2`}
          onClick={() => {
            setActiveChord(undefined)
            setMode(mode)
          }}
        >
          <p className={'text-xs md:text-base'}>
            {mode === 'maj' ? 'major' : 'minor'}
          </p>
        </div>
      ))}
      {(['pentatonic', 'blues'] as ScaleType[]).map((scale) => (
        <div
          className={`${
            scaleType === scale && selectedStyles
          } text-left cursor-pointer select-none mb-2`}
          onClick={() => toggleScaleType(scale)}
        >
          <p className={'text-xs md:text-base'}>{scale}</p>
        </div>
      ))}
    </div>
  )
}
