/* eslint-disable no-use-before-define */
import React from 'react';
import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from "../Preloader/Preloader";
import Header from '../Header/Header';
import { ERR_NOT_MOV } from '../../utils/constant';

export default function SavedMovies(props) {

    const [isErr, setIsErr] = React.useState(false);
    const [isSelectedShortMovie, setIsSelectedIsShortMovie] = React.useState(false);
    const [isSeeMovie, setIsSeeMovie] = React.useState([]);

    React.useEffect(() => {
        setIsSelectedIsShortMovie(JSON.parse(localStorage.getItem('isCheckSave')) || false);
        setIsSeeMovie(localStorage.getItem("moviesSearchSave") || []);
    }, []);

    React.useEffect(() => {
        setIsSeeMovie(props.movies);
        props.setIsBigErr({ text: '' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.movies, props.currentUser]);

    function searchFromMovies() {
        props.setIsBigErr({ text: '' })
        const filter = props.isMovieSearch.filter((movie) => movie.nameRU.toLowerCase().includes(props.isSearch.toLowerCase()));
        filter.length === 0 ? props.setIsBigErr({ text: ERR_NOT_MOV }) : setIsSeeMovie(filter);
        localStorage.setItem('isCheckSave', JSON.stringify(isSelectedShortMovie))
        props.setIsLoading(false);
        localStorage.setItem("moviesSearchSave", JSON.stringify(filter));
        console.log(localStorage)
    };

    function handleSubmit(e) {
        e.preventDefault();
        props.setIsLoading(true);
        props.isSearch ? searchFromMovies() : setIsErr(true);
    }

    function handleChangeShortMovie() {
        setIsSelectedIsShortMovie(!isSelectedShortMovie)
        localStorage.setItem('isCheckSave', JSON.stringify(!isSelectedShortMovie));
    }

    const seeMovies = isSelectedShortMovie ? isSeeMovie.filter((item) => item.duration < 40) : isSeeMovie;

    function handleOnChange(e) {
        props.setIsSearch(e.target.value)
        setIsErr(false);
    }


    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} />
            <section className="save-movies">
                <SearchForm isErr={isErr} onSubmit={handleSubmit} isSearch={props.isSearch} onChange={handleOnChange} />
                <FilterCheckbox onSelectShortMovie={handleChangeShortMovie} isSelectedShortMovie={isSelectedShortMovie} />
                {props.isLoading ?
                    <Preloader /> :
                    props.isBigErr.text !== '' ?
                        <p className="movies__err movies__err_save">{props.isBigErr.text}</p>
                        :
                        <MoviesCardList movies={seeMovies} onCardLike={props.onCardLike}
                            isLike={props.isLike}
                            onCardDislike={props.onCardDislike}
                            checkId={props.checkId}
                        />
                }
            </section>
            <Footer />
        </>
    );
}