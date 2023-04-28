import React, {PropsWithChildren} from 'react'

export const Fade = (props: PropsWithChildren) => {
    return (
        <div className='fade-in'>{props.children}</div>
    )
}