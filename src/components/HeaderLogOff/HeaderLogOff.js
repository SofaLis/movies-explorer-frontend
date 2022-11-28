import React from 'react';
import './HeaderLogOff.css';
import { Link } from "react-router-dom";

import { LINK_SIGNIN, LINK_SIGNUP } from '../../utils/constant';

export default function HeaderLogOff(props) {
    return (
        <div className="header__auth">
            <Link className="header__link" to={LINK_SIGNUP} >
                Регистрация
            </Link>
            <Link className="header__link" to={LINK_SIGNIN} >
                <button className="button header__button">
                    Войти
                </button>
            </Link>
        </div>
    );
}
