import React from 'react';
import './MoviesCardList.css';

export default function MoviesCardList(props) {

    return (
        <>
            <ul className='card__list'>
                {props.children}
            </ul>
            <button className='button card__button'>Ещё</button>
        </>
    );
}
