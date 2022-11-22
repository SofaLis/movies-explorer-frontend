import React, { useCallback } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function useValidation() {
    const currentUser = React.useContext(CurrentUserContext);
    const [isValues, setIsValues] = React.useState({ name: currentUser.name || '', email: currentUser.email || '', password: '' });
    const [isErr, setIsErr] = React.useState({});
    const [isValidity, setIsValidity] = React.useState(false);

    React.useEffect(() => {
        setIsValues({ name: currentUser.name, email: currentUser.email })
    }, [currentUser]);

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setIsValues({ ...isValues, [name]: value });
        setIsErr({ ...isErr, [name]: target.validationMessage });
        setIsValidity(target.closest("form").checkValidity());
    };

    const resetForm = useCallback(
        (newIsValues = { name: '', email: '', password: '' }, newIsErr = {}, newIsValid = false) => {
            setIsValues(newIsValues);
            setIsErr(newIsErr);
            setIsValidity(newIsValid);
        },
        [setIsValues, setIsErr, setIsValidity]
    );

    return { isValues, isErr, isValidity, setIsValues, handleChange, resetForm };
}