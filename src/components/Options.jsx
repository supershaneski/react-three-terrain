import React from 'react'
import classes from './Options.module.css'

const CheckItem = ({ label, checked, onChange }) => {
    return (
        <div className={classes.item}>
            <label>{ label }</label>
            <input type="checkbox" 
            checked={checked} onChange={onChange} />
        </div>
    )
}

const SliderItem = ({ label, disabled, value, onChange }) => {
    return (
        <div className={classes.item}>
            <label style={{
                color: disabled ? '#555' : '#fff',
            }}>{ label }</label>
            <input disabled={disabled} type="range" min={1} max={100} value={value} onChange={onChange} />
        </div>
    )
}

const SelectItem = ({ label, value, onChange, items }) => {
    return (
        <div className={classes.item}>
            <label>{ label }</label>
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

const TextItem = ({ label, disabled, value, width = '6em', onChange }) => {
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

const Options = ({ children }) => <>{ children }</>

Options.CheckItem = CheckItem
Options.SliderItem = SliderItem
Options.SelectItem = SelectItem
Options.TextItem = TextItem

export default Options