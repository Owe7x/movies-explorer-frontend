import { useCallback, useState } from 'react';


export const FormValidation = () => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = useCallback((evt) => {
        const name = evt.target.name
        const value = evt.target.value
        const form = evt.target.closest("form")
        setValues({ ...values, [name]: value })
        setErrors({ ...errors, [name]: evt.target.validationMessage })
        setIsValid(evt.target.closest("form").checkValidity());
    },
        [errors, values]
    )
    const resetForm = useCallback((newErrors = {}, newIsValid = false) => {
        setErrors(newErrors);
        setIsValid(newIsValid);
    },
        [setErrors, setIsValid]
    )

    return { values, handleChange, resetForm, errors, isValid, setValues };
}
