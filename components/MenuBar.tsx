import { useKeyContext } from './KeyContext'

interface IMenuBar {
  theme?: 'light' | 'dark'
}

export const MenuBar = ({ theme = 'light' }: IMenuBar) => {
  const {
    rootNote,
    mode,
    setMode,
    scaleType,
    setScaleType,
    setDisplayRootNoteOptions,
  } = useKeyContext()
  const themeStyles = {
    light: {
      textColor: 'white',
      pentagonImgSrc: './pentagon.png',
    },
    dark: {
      textColor: 'cageda',
      pentagonImgSrc: './pentagon-black.png',
    },
  }
  const styles = themeStyles[theme]

  const togglePentatonic = () => {
    setDisplayRootNoteOptions(false)
    if (scaleType === 'base') return setScaleType('pentatonic')
    return setScaleType('base')
  }

  const toggleMode = () => {
    setDisplayRootNoteOptions(false)
    setMode((mode) => (mode == 'maj' ? 'min' : 'maj'))
  }
  const toggleRootNoteDisplay = () =>
    setDisplayRootNoteOptions((state) => !state)

  return (
    <div className="flex flex-col items-center">
      <div className="mt-3 flex flex-row items-center justify-center">
        <div className={'flex flex-row items-center p-1'}>
          <h3
            className={`font-poppins font-bold text-4xl text-${styles.textColor} mr-3 cursor-pointer`}
            onClick={toggleRootNoteDisplay}
          >
            {rootNote}
          </h3>
          <h3
            className={`font-poppins font-bold text-2xl text-${styles.textColor} cursor-pointer`}
            onClick={toggleMode}
          >
            {mode}
          </h3>
        </div>
        <div
          className={`flex justify-normal place-items-center ${
            scaleType !== 'pentatonic' && 'opacity-30'
          } cursor-pointer p-2 rounded-full h-12 w-12`}
          onClick={togglePentatonic}
        >
          <img src={styles.pentagonImgSrc} className="h-7" />
        </div>
      </div>
    </div>
  )
}
