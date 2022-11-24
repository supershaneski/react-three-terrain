import { createContext, useReducer } from 'react'

const initialState = {
    app: {
        mapSource: '',
        status: 0,
        level: 70,
        wireframe: false,
        colorMode: 0,
        textureFlag: true,
        color: "#642310",
        seaFlag: true,
        seaLevel: 2,
        seaLevelCoeff: 0.5,
        seaMove: true,
        seaMoveCoeff: 0.25,
        naviMode: 0,
        pattern: 0,
    },
}

const appReducer = (state, action) => {
    switch(action.type) {
        case 'app-set':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

const combinedReducers = ({ app }, action) => ({
    app: appReducer(app, action),
})

const GlobalContext = createContext(initialState)

const GlobalState = ({ children }) => {

    const [state, dispatch] = useReducer(combinedReducers, initialState)
    
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
        { children }
        </GlobalContext.Provider>
    )

}

export default GlobalState

export { GlobalContext, GlobalState }