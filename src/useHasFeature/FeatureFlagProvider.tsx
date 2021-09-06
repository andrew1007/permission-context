import React, { createContext, useEffect, useReducer } from "react";
import getFeatureFlags from "../mocks/getFeatureFlags";

// O(1) search. Set would be ideal, but it's best put
// data structures that are easy to shallow copy
const arrayToBooleanObject = (arr: string[]) => Object.fromEntries(arr.map(feature => [feature, true]))

type State = Record<string, boolean>
type Action<T> = {
    payload: T,
}

const initialState: State = {}

export const FFContext = createContext(initialState)

type reducer = (state: State, action: Action<State>) => State

export default function Provider<P = {}>(Component: React.JSXElementConstructor<P>) {
    const ProviderHoc: React.FC<P> = (props) => {
        const reducer: reducer = (_, action) => action.payload
        const [state, dispatch] = useReducer(reducer, initialState)

        const getAndSetFeatureFlags = async () => {
            const { data } = await getFeatureFlags()
            dispatch({ payload: arrayToBooleanObject(data) })
        }

        useEffect(() => {
            getAndSetFeatureFlags()
        }, [])

        return (
            <FFContext.Provider value={state}>
                <Component {...props} />
            </FFContext.Provider>
        )
    }

    return ProviderHoc
}
