interface ISelectorTooltip {
  isDisplayed: boolean
  options: {
    text: string
    onClick: () => void
  }[]
}

export const SelectorTooltip = ({ isDisplayed, options }: ISelectorTooltip) => {
  if (!isDisplayed) return null

  return (
    <div className="bg-slate-700 rounded-md flex flex-row flex-wrap justify-center items-center absolute z-40 w-64 h-64 p-3">
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
    </div>
  )
}
