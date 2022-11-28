import React from 'react';
import './NavTab.css';

import { LINK_PROJECT, LINK_TECHS, LINK_ME } from '../../utils/constant';

export default function Promo() {
    return (
        <section className="nav-tab">
            <ul className="nav-tab__list">
                <li className="nav-tab__item"><a href={LINK_PROJECT} className="link">О проекте</a></li>
                <li className="nav-tab__item"><a href={LINK_TECHS} className="link" >Технологии</a></li>
                <li className="nav-tab__item"><a href={LINK_ME} className="link">Студент</a></li>
            </ul>
        </section >
    );
}