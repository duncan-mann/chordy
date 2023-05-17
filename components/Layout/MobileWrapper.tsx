import { PropsWithChildren } from 'react'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'

export const MobileWrapper = ({ children }: PropsWithChildren): JSX.Element => {
  const { tailwindSize } = useWindowDimensions()
  return tailwindSize === 'xsm' ? (
    <div className="w-full flex justify-center items-center bg-red-500 min-h-screen">
      <h1 className="text-white font-inter font-thin text-sm">
        Fretboard.fyi is currently optimized for desktop
      </h1>
    </div>
  ) : (
    <>{children}</>
  )
}
