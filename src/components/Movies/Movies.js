/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Preloader from "../Preloader/Preloader";
import { useState } from "react";

export default function Movies(props) {
    const [isErr, setIsErr] = React.useState(false);
    const [isSelectedShortMovie, setIsSelectedIsShortMovie] = useState(false);

    React.useEffect(() => {
        setIsSelectedIsShortMovie(JSON.parse(localStorage.getItem('isCheck')) || false);
        props.setIsSearch(localStorage.getItem("isSearch") || "");
        localStorage.setItem("movies", JSON.stringify(props.movies))
    }, [props.movies]);


    React.useEffect(() => {
        props.setIsBigErr({ text: '' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        props.setIsBigErr({ text: '' });
        props.setMoviesSearch([]);
        props.setIsLoading(true);
        props.isSearch ? props.onClick() : setIsErr(true);
        localStorage.setItem('isCheck', JSON.stringify(isSelectedShortMovie))
        localStorage.setItem("isSearch", props.isSearch);
    }

    function handleChangeShortMovie() {
        setIsSelectedIsShortMovie(!isSelectedShortMovie)
        localStorage.setItem('isCheck', JSON.stringify(!isSelectedShortMovie))
    }

    //Это мы изменяем списко фильмов в завимимости от того, нажали ли на чекбоксю
    const seeMovies = isSelectedShortMovie ? props.movies.filter((item) => item.duration < 40) : props.movies;

    function handleOnChange(e) {
        props.setIsSearch(e.target.value)
        setIsErr(false);
    }

    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} />
            <section className="movies">
                <SearchForm isErr={isErr} onSubmit={handleSubmit} isSearch={props.isSearch} onChange={handleOnChange} />
                <FilterCheckbox onSelectShortMovie={handleChangeShortMovie} isSelectedShortMovie={isSelectedShortMovie} />
                {props.isLoading ?
                    <Preloader /> :
                    <MoviesCardList movies={seeMovies} onCardLike={props.onCardLike}
                        onCardDislike={props.onCardDislike}
                        checkId={props.checkId}
                        isLike={props.isLike}
                    />
                }
                {props.isBigErr !== '' &&
                    <p className="movies__err">{props.isBigErr.text}</p>
                }
            </section>
            <Footer />
        </>
    );
}