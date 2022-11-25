import React from 'react';
import './Login.css';
import Authorization from '../Authorization/Authorization';
import useValidation from "../../utils/validations";

import { LINK_SIGNUP } from '../../utils/constant';

export default function Login(props) {
    const validationForm = useValidation()

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(validationForm.isValues.email, validationForm.isValues.password);
    }

    const buttonDis = props.isAddForm ? !props.isAddForm : validationForm.isValidity;

    return (
        <Authorization formName="login" title="Рады видеть!" buttonText="Войти"
            text="Ещё не зарегистрированы?" linkText="Регистрация" link={LINK_SIGNUP}
            onSubmit={handleSubmit} handleChangeName={validationForm.handleChange} handleChangeEmail={validationForm.handleChange}
            handleChangePassword={validationForm.handleChange} isErr={props.isErr} setIsErr={props.setIsErr}
            name={validationForm.isValues.name} email={validationForm.isValues.email} password={validationForm.isValues.password}
            isErrName={validationForm.isErr.name} isErrEmail={validationForm.isErr.email}
            isErrPassword={validationForm.isErr.password} buttonDis={buttonDis} />
    )
}