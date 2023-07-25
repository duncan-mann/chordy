/**
 * // useWindowDimension.ts
 * * This hook returns the viewport/window height and width
 */

import { useEffect, useState } from 'react'

type WindowDimentions = {
  width?: number
  height?: number
  tailwindSize?: TailWindSize
}
type TailWindSize = '' | 'xsm' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const getTailwindSize = (innerWidth: number): TailWindSize => {
  if (innerWidth < 640) {
    return ''
  } else if (innerWidth < 768) {
    return 'sm'
  } else if (innerWidth < 1024) {
    return 'md'
  } else if (innerWidth < 1280) {
    return 'lg'
  } else if (innerWidth < 1536) {
    return 'xl'
  } else {
    return '2xl'
  }
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
    width: 0,
    height: 0,
    tailwindSize: 'sm',
  })
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        tailwindSize: getTailwindSize(window.innerWidth),
      })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const calculateResponsiveTextSize = (
    screenWidth: number,
    baseSize: number,
    scaleFactor: number
  ) => {
    const scaledSize = baseSize + screenWidth * scaleFactor
    return `${Math.round(scaledSize)}px`
  }

  return { ...windowDimensions, calculateResponsiveTextSize }
}

export default useWindowDimensions
