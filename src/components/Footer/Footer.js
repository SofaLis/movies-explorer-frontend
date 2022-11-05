import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="footer__description">
                    <p className="footer__text">© 2021</p>
                    <ul className="footer__list">
                        <li className="footer__text">
                            <a className="link footer__link" href="https://practicum.yandex.ru"
                                target="_blank" rel="noreferrer">
                                Яндекс.Практикум
                            </a>
                        </li>
                        <li className="footer__text">
                            <a className="link footer__link" href="https://github.com"
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