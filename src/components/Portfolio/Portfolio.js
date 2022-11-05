import React from 'react';
import './Portfolio.css';

export default function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <a className="link portfolio__link" href="https://github.com/SofaLis/how-to-learn-main"
                        target="_blank" rel="noreferrer">
                        <div className="portfolio__container">
                            <p className="portfolio__text">Статичный сайт</p>
                            <p className="portfolio__text portfolio__text_arrow">↗</p>
                        </div>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a className="link portfolio__link" href="https://github.com/SofaLis/three_project"
                        target="_blank" rel="noreferrer">
                        <div className="portfolio__container">
                            <p className="portfolio__text">Адаптивный сайт</p>
                            <p className="portfolio__text portfolio__text_arrow">↗</p>
                        </div>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a className="link portfolio__link" href="https://github.com/SofaLis/react-mesto-api-full"
                        target="_blank" rel="noreferrer">
                        <div className="portfolio__container">
                            <p className="portfolio__text">Одностраничное приложение</p>
                            <p className="portfolio__text portfolio__text_arrow">↗</p>
                        </div>
                    </a>
                </li>
            </ul>
        </section>
    );
}