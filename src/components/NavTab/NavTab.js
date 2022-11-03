import React from 'react';
import './NavTab.css';

export default function Promo() {
    return (
        <section className="nav-tab">
            <ul className="nav-tab__list">
                <li className="nav-tab__item"><a href="#project" className="link">О проекте</a></li>
                <li className="nav-tab__item"><a href="#techs" className="link" >Технологии</a></li>
                <li className="nav-tab__item"><a href="#me" className="link">Студент</a></li>
            </ul>
        </section >
    );
}