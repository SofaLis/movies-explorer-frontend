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

    function handleSubmit(e) {
        e.preventDefault();
        props.setIsLoading(true);
        props.search ? props.onClick(false) : setIsErr(true);
    }

    function handleChangeSearchForm(e) {
        setIsErr(false);
    }

    function handleChangeShortMovie () {
        if (isSelectedShortMovie) {
            setIsSelectedIsShortMovie(false)
        } else {
            setIsSelectedIsShortMovie(true)
        }

    }

    const seeMovies = isSelectedShortMovie ? props.movies.filter((film) => film.duration < 40) : props.movies;

    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} />
            <section className="movies">
                <SearchForm isErr={isErr} onChange={handleChangeSearchForm} onSubmit={handleSubmit} />
                <FilterCheckbox onSelectShortMovie={handleChangeShortMovie} isSelectedShortMovie={isSelectedShortMovie} />
                {props.isLoading ?
                    <Preloader /> :
                    <MoviesCardList movies={seeMovies} onCardLike={props.onCardLike}
                    isLike={props.isLike} 
                    onCardDislike={props.onCardDislike}
                    />
                }
            </section>
            <Footer />
        </>
    );
}