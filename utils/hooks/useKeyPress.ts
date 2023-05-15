import { useEffect } from "react"
import { useKeyContext } from "../../components/KeyContext"

export const useKeyPress = () => {
    const {setActiveChord, keySig} = useKeyContext()

    const onKeyPress = (event: KeyboardEvent) => {
        const { key } = event
        const numericKey = Number(key)
        if (isNaN(numericKey)) return
        if (numericKey > 7 || numericKey < 1) return
    
        const chordIdx = numericKey - 1
        setActiveChord(keySig.chords[chordIdx])
        
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeyPress)
        return (): void => document.removeEventListener('keydown', onKeyPress)
    })
}