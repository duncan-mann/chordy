import React, { useState, useEffect, PropsWithChildren } from 'react'
import { useFeatureAutomation } from '../utils/hooks/useFeatureAutomation'
import { useKeyContext } from './KeyContext'
import { Fade } from './animations/Fade'

interface WelcomeStep {
  title: string
  description: string
  buttonText: string
  buttonAction?: () => void
}

export const GuideSidebar = () => {
  const { sidebarIsOpen, setSidebarIsOpen } = useKeyContext()
  const [welcomeState, setWelcomeState] = useState<number>(0)
  const {
    automateSetRootNote,
    automatePentatonicScale,
    automateChordSelection,
  } = useFeatureAutomation()
  useEffect(() => {
    if (!sidebarIsOpen) setWelcomeState(0)
  }, [sidebarIsOpen])

  const goToNextStep = () => {
    setWelcomeState((state) => state + 1)
  }
  const closeSidebar = () => setSidebarIsOpen(false)

  const steps: WelcomeStep[] = [
    {
      title: 'Welcome to fretboard.fyi',
      description:
        'With this tool you can easily navigate the guitar fretboard by visualizing scales and chords in any key.',
      buttonText: 'Get started',
      buttonAction: async () => {
        goToNextStep()
        await automateSetRootNote()
      },
    },
    {
      title: 'Learn Scales Across the Fretboard',
      description:
        'Select a harmonic key and see the full scale across the fretboard.',
      buttonText: 'Next',
      buttonAction: async () => {
        goToNextStep()
        await automatePentatonicScale()
      },
    },
    {
      title: 'Explore the Pentatonic Scale',
      description:
        'Click the pentatonic button to visualize the widely used scale found in all music genres.',
      buttonText: 'Next',
      buttonAction: async () => {
        goToNextStep()
        await automateChordSelection()
      },
    },
    {
      title: 'Diversify Your Chord Progressions',
      description:
        'Discover alternative chord voicings by clicking on a chord name. Find a range of voicings across the neck, adding unique sounds and variations to familiar songs.',
      buttonText: 'Next',
      buttonAction: closeSidebar,
    },
  ]

  const step = steps[welcomeState]

  return (
    <div
      className={`w-[30vw] lg:w-[25vw] bg-slate-800/50 backdrop-blur-sm text-white transition-transform duration-500 ease-in-out transform rounded-2xl ${
        sidebarIsOpen ? 'translate-x-0' : 'translate-x-full'
      } fixed top-0 right-0 h-screen z-[100] font-poppins`}
    >
      <WelcomeContent step={step} />
    </div>
  )
}

const WelcomeContent = ({ step }: PropsWithChildren<{ step: WelcomeStep }>) => {
  return (
    <Fade key={step.title} className="min-h-screen">
      <div className={'flex flex-col mt-44 items-center p-10 min-h-screen'}>
        <p className={'text-white text-3xl mb-8 text-center'}>{step.title}</p>
        <p className={'text-sm mb-10 text-center'}>{step.description}</p>
        <button
          className={'rounded-md border-white border-2 p-1 w-32'}
          onClick={step.buttonAction}
        >
          {step.buttonText}
        </button>
      </div>
    </Fade>
  )
}
