/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

import { HOUR } from '../../utils/constant';

import {LINK_MOVIES_SAVE, LINK_API} from '../../utils/constant';

export default function MoviesCard(props) {

    const location = useLocation();
    const saveMovRoot = location.pathname === LINK_MOVIES_SAVE;
    const image = !saveMovRoot ? `${LINK_API}${props.movie.image.url}` : `${props.movie.image}`

    function handleLikeClick() {
        if (!props.movie.isLike) {
            props.onCardLike(props.movie)
            props.movie.isLike = true
        } else {
            props.onCardDislike(props.checkId(props.movie.id)._id)
            props.movie.isLike = false
        }
    }

    function handleDeleteClick() {
        props.onCardDislike(props.movie._id);
        props.movie.isLike = false;
    };


    return (
        <li className={`card ${props.isVisible ? 'card_visible' : ''}`} >
            <a href={props.movie.trailerLink} target="_blank" rel="noreferrer" className='link' >
                <img src={image} alt="Поcтер фильма" className="card__img" />
            </a>
            <div className='card__caption'>
                <h4 className='card__name'>{props.movie.nameRU}</h4>
                {!saveMovRoot &&
                    <button className={`card__btn ${props.movie.isLike ? "card__like-on" : "card__like-off"}`}
                        type="button" onClick={handleLikeClick}></button>
                }
                {saveMovRoot &&
                    <button className="card__btn card__btn_delete" type="button" onClick={handleDeleteClick}></button>
                }
            </div>
            <p className='card__time'>{`${Math.floor(props.movie.duration / {HOUR})}ч ${props.movie.duration % {HOUR}}м `}</p>
        </li>
    );
}