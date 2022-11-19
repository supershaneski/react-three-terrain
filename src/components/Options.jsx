import React from 'react'
import classes from './Options.module.css'

const CheckItem = ({ label, disabled = false, checked, onChange }) => {
    return (
        <div className={classes.item}>
            <label style={{
                color: disabled ? '#555' : '#fff',
            }}>{ label }</label>
            <input type="checkbox" 
            disabled={disabled}
            checked={checked} onChange={onChange} />
        </div>
    )
}

const SliderItem = ({ label, disabled = false, value, onChange }) => {
    return (
        <div className={classes.item}>
            <label style={{
                color: disabled ? '#555' : '#fff',
            }}>{ label }</label>
            <input disabled={disabled} type="range" min={1} max={100} value={value} onChange={onChange} />
        </div>
    )
}

const SelectItem = ({ label, disabled = false, value, onChange, items }) => {
    return (
        <div className={classes.item}>
            <label style={{
                color: disabled ? '#555' : '#fff',
            }}>{ label }</label>
            <select value={value} onChange={onChange}>
            {
                items.map((item, index) => {
                    return (
                        <option key={index} value={item.value}>{item.text}</option>
                    )
                })
            }
            </select>
        </div>
    )
}

const TextItem = ({ label, disabled = false, value, width = '5em', onChange }) => {
    return (
        <div className={classes.item}>
            <label style={{
                color: disabled ? '#555' : '#fff',
            }}>{ label }</label>
            <input disabled={disabled} type="text" 
            value={value} onChange={onChange}
            style={{ width: width }}
            />
        </div>
    )
}

function areEqual(prevProps, nextProps) {
    
    let isEqual = true

    for(let k in prevProps) {
        if(typeof prevProps[k] !== 'function') {
            if(prevProps[k] !== nextProps[k]) {
                isEqual = false
                break
            }
        }
    }

    return isEqual
}

const Options = ({ children }) => <>{ children }</>

Options.CheckItem = React.memo(CheckItem, areEqual)
Options.SliderItem = React.memo(SliderItem, areEqual)
Options.SelectItem = React.memo(SelectItem, areEqual)
Options.TextItem = React.memo(TextItem, areEqual)

export default Options