import React from 'react';
import './Footer.css';

import { LINK_GIT, LINK_YANDEX_PR } from '../../utils/constant';

export default function Footer() {

    return (
        <footer className="footer">
            <div className="footer__container">
                <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="footer__description">
                    <p className="footer__text">© 2021</p>
                    <ul className="footer__list">
                        <li className="footer__text">
                            <a className="link footer__link" href={LINK_YANDEX_PR}
                                target="_blank" rel="noreferrer">
                                Яндекс.Практикум
                            </a>
                        </li>
                        <li className="footer__text">
                            <a className="link footer__link" href={LINK_GIT}
                                target="_blank" rel="noreferrer">
                                Github
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}