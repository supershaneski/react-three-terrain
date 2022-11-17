import React from 'react'

const getTime = () => (new Date()).toLocaleTimeString()

const Clock = () => {
    const [time, setTime] = React.useState(getTime)
    React.useEffect(() => {
        const timer = setInterval(() => {
            setTime(getTime)
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])
    return (
        <span>{time}</span>
    )
}

export default Clock