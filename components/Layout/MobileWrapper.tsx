import { PropsWithChildren } from 'react'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'

export const MobileWrapper = ({ children }: PropsWithChildren): JSX.Element => {
  const { width } = useWindowDimensions()
  return width < 400 ? (
    <div
      className={`w-full flex justify-center items-center min-h-screen bg-[url('./images/CAGED-Background.jpeg')] bg-no-repeat bg-center bg-cover`}
    >
      <h1 className="text-white font-bold font-poppins text-lg text-center p-3">
        {
          "We're currently working on mobile optimization, check us out on desktop!"
        }
      </h1>
    </div>
  ) : (
    <>{children}</>
  )
}
