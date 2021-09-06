import { ChangeEvent, useState } from 'react'
import useHasFeature from './useHasFeature/useHasFeature'

const FeatureChecker = () => {
    const [text, setText] = useState('')
    const [status, setStatus] = useState<null | boolean>(null)

    const { hasFeature } = useHasFeature()
    const check = () => {
        setStatus(hasFeature(text))
    }

    const update = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
        setText(currentTarget.value)
    }

    return (
        <div>
            <h3>
                Does the user have this feature?
            </h3>
            <input onChange={update} />
            <button onClick={check}>
                Check
            </button>
            <div>
                {status ? 'Yes' : 'No'}
            </div>
        </div>
    )
}

export default FeatureChecker