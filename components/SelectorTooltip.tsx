import { RefObject } from 'react'
import { FocusId, FocusWrapper } from './animations/FocusWrapper'

interface ISelectorTooltip {
  focusId?: FocusId
  isDisplayed: boolean
  options: {
    text: string
    onClick: () => void
  }[]
}

export const SelectorTooltip = ({
  isDisplayed,
  options,
  focusId,
}: ISelectorTooltip) => {
  return (
    <div
      className={`bg-slate-700 rounded-md flex flex-row flex-wrap justify-center items-center absolute top-28 left-14 z-40 w-64 p-3 ${
        isDisplayed ? 'scale-y-100' : 'scale-y-0'
      } transition-height duration-300 origin-top-left`}
    >
      <FocusWrapper id={focusId}>
        {options.map(({ text, onClick }) => (
          <div
            key={text}
            onClick={() => onClick()}
            className="w-9 h-9 rounded-sm mr-5 hover:border-solid hover:border-white"
          >
            <p className="text-gray-300 font-infer font-thin text-center text-2xl cursor-pointer">
              {text}
            </p>
          </div>
        ))}
      </FocusWrapper>
    </div>
  )
}
