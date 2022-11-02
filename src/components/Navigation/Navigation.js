import React from 'react';
import './Navigation.css';
import { Link } from "react-router-dom";
import akkaunt from '../../images/akkaunt.svg';

export default function Navigation(props) {
    return (
        <div className={props.isOpen ? `navigation navigation_active` : `navigation`}>
            <div className="navigation__container">
                <button className="navigation__close" onClick={props.onClick}></button>
                <div className="navigation__container-link">
                    <ul className="navigation__list">
                        <li className="navigation__item">
                            <Link className="navigation__link" to="/movies">
                                Главная
                            </Link>
                        </li>
                        <li className="navigation__item">
                            <Link className="navigation__link" to="/saved-movies">
                                Фильмы
                            </Link>
                        </li>
                        <li className="navigation__item">
                            <Link className="navigation__link" to="/saved-movies">
                                Сохранённые фильмы
                            </Link>
                        </li>
                    </ul>
                    <Link className="navigation__item navigation__akkaunt" to="/profile" >
                        <p className="navigation__text">Аккаунт</p>
                        <div className="navigation__img-container">
                            <div className="navigation__img-container">
                                <img src={akkaunt} className="navigation__img" alt="лого" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}