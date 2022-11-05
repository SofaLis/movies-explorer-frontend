import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

export default function MoviesCard(props) {

    const location = useLocation();
    const saveMovRoot = location.pathname === '/saved-movies';

    const [isLike, setIsLike] = React.useState(false);
    function handleLikeClick() {
        isLike ? setIsLike(false) : setIsLike(true);
    }

    return (
        <li className='card'>
            <img src={props.img} alt="Потер фильма" className="card__img" />
            <div className='card__caption'>
                <h4 className='card__name'>{props.name}</h4>
                {!saveMovRoot &&
                    <button className={`card__btn ${isLike ? "card__like-on" : "card__like-off"}`}
                        type="button" onClick={handleLikeClick}></button>
                }
                {saveMovRoot &&
                    <button className="card__btn card__btn_delete" type="button"></button>
                }
            </div>
            <p className='card__time'>{props.time}</p>
        </li>
    );
}