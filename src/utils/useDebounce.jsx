import React from 'react'

export default function useDebounce(value, delay)  {
    
    const [debounceValue, setDebouncedValue] = React.useState(value)
    
    React.useEffect(() => {

        const timer = setTimeout(() => setDebouncedValue(value), delay)

        return () => {
            clearTimeout(timer)
        }

    }, [value, delay])

    return parseInt(debounceValue)
}