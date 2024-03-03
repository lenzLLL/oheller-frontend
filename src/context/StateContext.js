import { createContext, useContext, useReducer } from "react";

export const stateContext = createContext()
export const StateProvider = ({initialeState,reducer,children})=>(
    <stateContext.Provider value ={useReducer(reducer,initialeState)}>
        {children}
    </stateContext.Provider>
)
export const useStateProvider = () => useContext(stateContext)