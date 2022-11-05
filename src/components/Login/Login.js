import React from 'react';
import './Login.css';
import Authorization from '../Authorization/Authorization';

export default function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    };

    function handleChangePassword(e) {
        setPassword(e.target.value)
    };

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(email, password);
    }

  return (
      <Authorization formName="login" title="Рады видеть!" buttonText="Войти" 
      text="Ещё не зарегистрированы?" linkText="Регистрация" link="/signup" name="login" 
      onSubmit={handleSubmit} handleChangeEmail={handleChangeEmail}
      handleChangePassword={handleChangePassword} />
  )
}