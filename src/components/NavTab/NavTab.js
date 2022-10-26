import React from 'react';
import './NavTab.css';

export default function Promo() {
    return (
        <section className="navigation">
            <ul className="navigation__list">
                <li className="navigation__item"><a href="#project" className="navigation__item_link">О проекте</a></li>
                <li className="navigation__item"><a href="#techs" className="navigation__item_link" >Технологии</a></li>
                <li className="navigation__item"><a href="#me" className="navigation__item_link">Студент</a></li>
            </ul>
        </section >
    );
}