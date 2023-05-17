import React, { HTMLAttributes, PropsWithChildren } from 'react'

interface IFade {
  className?: HTMLAttributes<HTMLDivElement>['className']
}

export const Fade = (props: PropsWithChildren<IFade>) => {
  return <div className={`fade-in ${props.className}`}>{props.children}</div>
}
