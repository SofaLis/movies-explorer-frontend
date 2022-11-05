import React from 'react';
import './AboutProject.css';

import MainBlock from '../MainBlock/MainBlock';

export default function AboutProject() {
    return (
        <MainBlock color={'white'} header={'О проекте'} name={'project'}>
            <div className="project__description">
                <div className="project__colum">
                    <p className="project__title">Дипломный проект включал 5 этапов</p>
                    <p className="project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="project__colum">
                    <p className="project__title">На выполнение диплома ушло 5 недель</p>
                    <p className="project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="project__zone">
                <div className="project__front">
                    <div className="project__date project__date_front">1 неделя</div>
                    <p className="project__name">Back-end</p>
                </div>
                <div className="project__back">
                    <div className="project__date project__date_back">4 недели</div>
                    <p className="project__name">Front-end</p>
                </div>
            </div>
        </MainBlock >
    );
}