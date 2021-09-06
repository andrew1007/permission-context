import { useContext } from "react"
import { FFContext } from "./FeatureFlagProvider"


export default function useHasFeature() {
    const flags = useContext(FFContext)
    return {
        hasFeature: (flag: string) => flag in flags
    }
}
