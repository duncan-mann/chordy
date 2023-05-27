import { PropsWithChildren } from 'react'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'

export const MobileWrapper = ({ children }: PropsWithChildren): JSX.Element => {
  const { width } = useWindowDimensions()
  return width < 400 ? (
    <div
      className={`w-full flex flex-col min-h-screen bg-[url('./images/CAGED-Background.jpeg')] bg-no-repeat bg-center bg-cover pt-32`}
    >
      <h1 className="text-center text-6xl mb-4">{'🎸'}</h1>
      <h2 className="text-white font-bold font-poppins text-2xl text-center px-4 mb-7 ">
        {'Mobile is currently in development!'}
      </h2>
      <p className="text-white font-bold font-poppins text-sm text-center">
        {'Come check us out on desktop'}
      </p>
    </div>
  ) : (
    <>{children}</>
  )
}
