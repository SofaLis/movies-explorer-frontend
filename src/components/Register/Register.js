import React from 'react';
import './Register.css';
import Authorization from '../Authorization/Authorization';
import useValidation from "../../utils/validations";

export default function Register(props) {
    const validationForm = useValidation()

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(validationForm.isValues.name, validationForm.isValues.email, validationForm.isValues.password);
    }

    const buttonDis = props.isAddForm ? !props.isAddForm : validationForm.isValidity;

  return (
      <Authorization formName="register" title="Добро пожаловать!" buttonText="Регистрация" 
      text="Уже зарегистрированы?" linkText="Войти" link="/signin" nameAuth="register"
      onSubmit={handleSubmit} handleChangeName={validationForm.handleChange} handleChangeEmail={validationForm.handleChange}
      handleChangePassword={validationForm.handleChange} isErr={props.isErr} setIsErr={props.setIsErr}
      name={validationForm.isValues.name} email={validationForm.isValues.email} password={validationForm.isValues.password}
      isErrName={validationForm.isErr.name} isErrEmail={validationForm.isErr.email} 
      isErrPassword={validationForm.isErr.password} buttonDis={buttonDis} />
  )
}