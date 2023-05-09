import './App.css'
import {ChangeEvent, useEffect, useState} from 'react'
import {getValidationError} from 'rc-validator'
import {ValidationError} from "../../validator";

const App = () => {
    const [birthNumber, setBirthNumber] = useState('')
    const [validationError, setValidationError] = useState<ValidationError | undefined>()

    const handleBirthNumberChange = (event : ChangeEvent<HTMLInputElement>) => {
        setBirthNumber(event.target.value)
    }

    useEffect(() => {
        const validationOutput = getValidationError(birthNumber)
        setValidationError(validationOutput)
    }, [birthNumber, setValidationError])

    return (
        <div className="App">
            <header className="App-header">
                Slovak birth number
                <input style={{fontSize: '2em'}} title="Slovak birth number" value={birthNumber} onChange={handleBirthNumberChange} />
                {birthNumber && (validationError ? validationError : 'Valid!')}
            </header>
        </div>
    )
}

export default App
