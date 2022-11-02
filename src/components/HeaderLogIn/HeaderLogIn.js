import React from 'react';
import './HeaderLogIn.css';
import { Link } from "react-router-dom";
import akkaunt from '../../images/akkaunt.svg';

export default function HeaderLogIn() {
    return (
        <>
            <div className="header__logon">
                <div className="header__links">
                    <Link className="header__link header__link_movie" to="/movies" >
                        Фильмы
                    </Link>
                    <Link className="header__link header__link_save-movie" to="/saved-movies" >
                        Сохранённые фильмы
                    </Link>
                </div>
                <Link className="header__link header__link_akkaunt" to="/profile" >
                    <p className="header__text">Аккаунт</p>
                    <div className="header__img-container">
                        <img src={akkaunt} className="header__img" alt="лого" />
                    </div>
                </Link>
            </div>
            <button className="button header__button-nav" ></button>
        </>
    );
}