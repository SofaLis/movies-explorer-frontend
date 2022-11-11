import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

export default function MoviesCard(props) {

    const location = useLocation();
    const saveMovRoot = location.pathname === '/saved-movies';
    const image = `https://api.nomoreparties.co${props.movie.image.url}`



    function handleLikeClick() {
        if (!props.isLike) {
            props.onCardLike(props.movie)
        } else {
            props.onCardDislike(props.movie)
        }
    }

    function handleDeleteClick() {
        props.onCardDelete(props.movie);
    };

    return (
        <li className={`card ${props.isVisible ? 'card_visible' : ''}`} >
            <a href={props.movie.trailerLink} target="_blank" rel="noreferrer" className='link' >
                <img src={image} alt="Поcтер фильма" className="card__img" />
            </a>
            <div className='card__caption'>
                <h4 className='card__name'>{props.movie.nameRU}</h4>
                {!saveMovRoot &&
                    <button className={`card__btn ${props.isLike ? "card__like-on" : "card__like-off"}`}
                        type="button" onClick={handleLikeClick}></button>
                }
                {saveMovRoot &&
                    <button className="card__btn card__btn_delete" type="button" onClick={handleDeleteClick}></button>
                }
            </div>
            <p className='card__time'>{`${Math.floor(props.movie.duration / 60)}ч ${props.movie.duration % 60}м `}</p>
        </li>
    );
}