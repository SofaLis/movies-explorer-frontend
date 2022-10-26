import React from 'react';
import './AboutMe.css';
import img from '../../images/img.jpg'

import MainBlock from '../MainBlock/MainBlock';

export default function AboutMe() {
    return (
        <MainBlock color={'white'} header={'Студент'} name={'me'}>
            <div className="me_portfolio">
                <div className="me_description">
                    <h4 className="me_name">Софа</h4>
                    <p className="me_year">Студентка Яндекс Практикума, 19 лет</p>
                    <p className="me_text">Родилась в небольшом, но прекрасном городе Находке, в 11 классе перебралась в Санкт-Петербург,
                        там же поступила в СПБГУАП по специальности электронника и наноэлекронника.
                        Стараюсь совмещать получение высшего образования и освоение более интересной для меня профессии - веб разработка.
                    </p>
                    <a className="me__link" href="https://github.com/SofaLis">Github</a>
                </div>
                <img className="me__img" src={img} alt="Это я" />
            </div>
        </MainBlock >
    );
}