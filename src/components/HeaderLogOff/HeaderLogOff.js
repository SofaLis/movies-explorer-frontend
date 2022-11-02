import React from 'react';
import './HeaderLogOff.css';
import { Link } from "react-router-dom";


export default function HeaderLogOff(props) {
    return (
            <div className="header__auth">
                <Link className="header__link" to="/signup" >
                    Регистрация
                </Link>
                <Link className="header__link" to="/signin" >
                    <button className="header__button">
                        Войти
                    </button>
                </Link>
            </div>
    );
}
