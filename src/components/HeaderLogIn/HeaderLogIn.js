import React from 'react';
import './HeaderLogIn.css';
import { Link } from "react-router-dom";
import akkaunt from '../../images/akkaunt.svg';

import { LINK_MOVIES, LINK_MOVIES_SAVE, LINK_PROFILE } from '../../utils/constant';

export default function HeaderLogIn(props) {
    return (
        <>
            <div className="header__logon">
                <div className="header__links">
                    <Link className="header__link header__link_movie" to={LINK_MOVIES} >
                        Фильмы
                    </Link>
                    <Link className="header__link header__link_save-movie" to={LINK_MOVIES_SAVE} >
                        Сохранённые фильмы
                    </Link>
                </div>
                <Link className="header__link header__link_akkaunt" to={LINK_PROFILE} >
                    <p className="header__text">Аккаунт</p>
                    <div className="header__img-container">
                        <img src={akkaunt} className="header__img" alt="лого" />
                    </div>
                </Link>
            </div>
            <button className="button header__button-nav" onClick={props.onClick}></button>
        </>
    );
}