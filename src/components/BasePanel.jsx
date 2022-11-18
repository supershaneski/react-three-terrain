import React from 'react'
import classes from './BasePanel.module.css'

const BasePanel = ({ title, children }) => {

    const [open, setOpen] = React.useState(false)

    return (
        <div className={classes.container}>
            <div className={classes.header} onClick={() => setOpen(f => !f)}>
                <span className={classes.headerText} style={{
                    color: open ? '#646cff' : '#fff'
                }}>{ title }</span>
            </div>
            <div className={classes.main} style={{
                display: open ? 'block' : 'none',
            }}>
            {
                children
            }
            </div>
        </div>
    )
}

export default BasePanel