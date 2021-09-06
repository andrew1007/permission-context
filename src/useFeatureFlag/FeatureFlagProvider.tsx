import React, { createContext, useEffect, useReducer } from "react";
import getFeatureFlags from "../mocks/getFeatureFlags";

// O(1) search. Set would be ideal, but it's best to not put
// mutable data structure that can't be easily shallow copied
const arrayToBooleanObject = (arr: string[]) => Object.fromEntries(arr.map(feature => [feature, true]))

type State = Record<string, boolean>
type Action<T> = {
    payload: T,
}

const initialState: State = {}

export const FFContext = createContext(initialState)

type reducer = <T extends State>(state: T, action: Action<Partial<T>>) => T

export default function Provider<P>(Component: React.JSXElementConstructor<P>) {
    const ProviderHoc: React.FC<P> = (props) => {
        const reducer: reducer = (state, action) => ({
            ...state,
            ...action.payload
        })
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
