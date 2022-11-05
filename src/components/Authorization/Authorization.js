import React from 'react';
import './Authorization.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Authorization(props) {

    const [isErr, setIsErr] = React.useState(false);

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
                                <input className={`${isErr ? "authorizatio__input authorizatio__input_active" : "authorizatio__input"}`}
                                    type="text" id="name" name="name"
                                    required minLength="2" maxLength="40" onChange={props.handleChangeName} value={props.name} />
                                <span className={`${isErr ? "authorizatio_err authorizatio_err_active" : "authorizatio_err"}`}>
                                    Что-то пошло не так...
                                </span>
                            </div>
                        )}

                        <div className="authorizatio__input-container">
                            <span className="authorizatio__caption">E-mail</span>
                            <input className={`${isErr ? "authorizatio__input authorizatio__input_active" : "authorizatio__input"}`}
                                type="email" id="email" name="email"
                                required onChange={props.handleChangeEmail} value={props.email} />
                            <span className={`${isErr ? "authorizatio_err authorizatio_err_active" : "authorizatio_err"}`}>
                                Что-то пошло не так...
                            </span>
                        </div>

                        <div className="authorizatio__input-container">
                            <span className="authorizatio__caption">Пароль</span>
                            <input className={`${isErr ? "authorizatio__input authorizatio__input_active" : "authorizatio__input"}`}
                                type="password" id="password" name="password"
                                required onChange={props.handleChangePassword} value={props.password} />
                            <span className={`${isErr ? "authorizatio_err authorizatio_err_active" : "authorizatio_err"}`}>
                                Что-то пошло не так...
                            </span>
                        </div>
                    </div>

                    <div className="authorizatio__dox">
                        <button type="submit" className="authorizatio__button">
                            {props.buttonText}
                        </button>
                        <p className='authorization__text'>{props.text}
                            <Link className='authorization__link authorization__link_text' to={props.link}>{props.linkText}</Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
}