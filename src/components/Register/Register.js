import React from 'react';
import './Register.css';
import Authorization from '../Authorization/Authorization';

export default function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    };

    function handleChangePassword(e) {
        setPassword(e.target.value)
    };

    function handleChangeName(e) {
        setName(e.target.value)
    };

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(name, email, password);
    }

  return (
      <Authorization formName="register" title="Добро пожаловать!" buttonText="Регистрация" 
      text="Уже зарегистрированы?" linkText="Войти" link="/signin" nameAuth="register"
      onSubmit={handleSubmit} handleChangeName={handleChangeName} handleChangeEmail={handleChangeEmail}
      handleChangePassword={handleChangePassword} />
  )
}