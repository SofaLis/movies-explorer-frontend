import React from 'react';
import './Navigation.css';
import { NavLink } from "react-router-dom";
import akkaunt from '../../images/akkaunt.svg';

import { LINK_MAIN, LINK_MOVIES, LINK_MOVIES_SAVE, LINK_PROFILE } from '../../utils/constant';

export default function Navigation(props) {
    return (
        <div className={props.isOpen ? `navigation navigation_active` : `navigation`}>
            <div className="navigation__container">
                <button className="button navigation__close" onClick={props.onClick}></button>
                <div className="navigation__container-link">
                    <nav className="navigation__list">
                        <NavLink exact to={LINK_MAIN} className="link navigation__link" activeClassName="navigation__link_active">
                            Главная
                        </NavLink>
                        <NavLink className="link navigation__link" to={LINK_MOVIES} activeClassName="navigation__link_active">
                            Фильмы
                        </NavLink>
                        <NavLink className="link navigation__link" to={LINK_MOVIES_SAVE} activeClassName="navigation__link_active">
                            Сохранённые фильмы
                        </NavLink>
                    </nav>
                    <NavLink className="link navigation__akkaunt" to={LINK_PROFILE} activeClassName="navigation__link_active">
                        <p className="navigation__text">Аккаунт</p>
                        <div className="navigation__img-container">
                            <div className="navigation__img-container">
                                <img src={akkaunt} className="navigation__img" alt="лого" />
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}