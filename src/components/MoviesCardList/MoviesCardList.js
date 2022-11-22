import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
    // Ширина 1280px — 12 карточек по 3 в ряд. Кнопка «Ещё» загружает по 3 карточки.
    // Ширина 768px — 8 карточек по 2 в ряд. Кнопка «Ещё» загружает по 2 карточки.
    // Ширина от 320px до 480px — 5 карточек по 1 в ряд. Кнопка «Ещё» загружает по 2 карточки.
    const [isWindowSize, setIsWindowSize] = React.useState({ width: undefined, height: undefined, });
    // Это количество наших карточек
    const [isMovieCount, setIsMovieCount] = React.useState(0);
    // А это сколько мы будем их загужать после кноки
    const [isMovieClick, setIsMovieClick] = React.useState(0);
    // это видимые карточки 
    const [isSeeMov, setIsSeeMov] = React.useState(isMovieCount);

    function handleResize() {
        setIsWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    function handleCheckSize() {
        if (isWindowSize.width >= 2100) {
            setIsMovieCount(6)
            setIsMovieClick(7)
        } else if (isWindowSize.width < 2100 && isWindowSize.width > 989) {
            setIsMovieCount(11)
            setIsMovieClick(3)
        } else if (isWindowSize.width <= 989 && isWindowSize.width > 665) {
            setIsMovieCount(7)
            setIsMovieClick(2)
        } else {
            setIsMovieCount(4)
            setIsMovieClick(2)
        }
    }

    React.useEffect(() => {
        function handleTimeout() {
            setTimeout(handleResize, 100);
        }
        handleResize()
        window.addEventListener("resize", handleTimeout);
        handleResize();
        return () => window.removeEventListener("resize", handleTimeout);
    }, []);

    function handleClickButton() {
        setIsSeeMov(isSeeMov + isMovieClick)
    }

    React.useEffect(() => {
        setIsSeeMov(isMovieCount);
        handleCheckSize()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMovieCount, isWindowSize]);

    return (
        <>
            <ul className='card__list'>
                {props.movies.map((movie, id) => (
                    <MoviesCard
                        key={movie.id || movie._id}
                        movie={movie}
                        onCardLike={props.onCardLike}
                        onCardDislike={props.onCardDislike}
                        isVisible={id <= isSeeMov}
                        checkId={props.checkId}
                    />
                ))}
            </ul>
            {(props.movies.length > isMovieCount && props.movies.length > isSeeMov) &&
                <button className='button card__button' onClick={handleClickButton}>Ещё</button>
            }
        </>
    );
}
