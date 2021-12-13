import { useState } from "react"

export const useForm = (initialState = {}) => {
    const [ formaData, setFormaData ] = useState(initialState);

    const resetData = () => {
        setFormaData( initialState );
    }

    const handleInputChange = ({ target }) => {
        const { name, value } = target;
        setFormaData({
            ...formaData,
            [ name ]: value
        });
    }

    return [ formaData, handleInputChange, resetData ]
}
