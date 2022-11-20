import React from 'react';
import './Authorization.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Authorization(props) {

    React.useEffect(() => {
        props.setIsErr({ text: '' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className={`authorization authorization__${props.formName}`} onSubmit={props.onSubmit} >
            <div className='authorization__container'>
                <Link className='authorization__link' to="/">
                    <img src={logo} alt="Логотип" className="authorization__logo" />
                </Link>
                <h2 className='authorization__title'>{props.title}</h2>
                <form className="authorizatio__form" name={`form_${props.formName}`}>
                    <div className="authorizatio__input-list">
                        {props.nameAuth === 'register' && (
                            <div className="authorizatio__input-container">
                                <span className="authorizatio__caption">Имя</span>
                                <input className={`${props.isErrName ? "authorizatio__input authorizatio__input_active" : "authorizatio__input"}`}
                                    type="text" id="name" name="name"
                                    required minLength="2" maxLength="40" onChange={props.handleChangeName} value={props.name} />
                                <span className={`${props.isErrName ? "authorizatio_err authorizatio_err_active" : "authorizatio_err"}`}>
                                    {props.isErrName}
                                </span>
                            </div>
                        )}

                        <div className="authorizatio__input-container">
                            <span className="authorizatio__caption">E-mail</span>
                            <input className={`${props.isErrEmail ? "authorizatio__input authorizatio__input_active" : "authorizatio__input"}`}
                                type="email" id="email" name="email" required onChange={props.handleChangeEmail}
                                value={props.email} pattern="^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.+[a-zA-Z]{2,}$" />
                            <span className={`${props.isErrEmail !== '' ? "authorizatio_err authorizatio_err_active" : "authorizatio_err"}`}>
                                {props.isErrEmail}
                            </span>
                        </div>

                        <div className="authorizatio__input-container">
                            <span className="authorizatio__caption">Пароль</span>
                            <input className={`${props.isErrPassword ? "authorizatio__input authorizatio__input_active" : "authorizatio__input"}`}
                                type="password" id="password" name="password" required onChange={props.handleChangePassword} value={props.password}
                                minLength="3" />
                            <span className={`${props.isErrPassword ? "authorizatio_err authorizatio_err_active" : "authorizatio_err"}`}>
                                {props.isErrPassword}
                            </span>
                        </div>
                    </div>
                    <div className="authorizatio__dox">
                        <button type="submit" className={`${!props.buttonDis ? "button authorizatio__button_off-active" : "authorizatio__button"}`}
                            disabled={!props.buttonDis}>
                            {props.buttonText}
                        </button>
                        <span className={`${props.isErr !== '' ? "authorizatio_err authorizatio_err_active" : "authorizatio_err"}`}>
                            {props.isErr.text}
                        </span>
                        <p className='authorization__text'>{props.text}
                            <Link className='authorization__link authorization__link_text' to={props.link}>{props.linkText}</Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
}