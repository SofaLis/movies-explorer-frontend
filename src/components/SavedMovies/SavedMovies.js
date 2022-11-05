import React from 'react';
import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import MoviesCard from '../MoviesCard/MoviesCard';
import film1 from '../../images/film1.png';
import film2 from '../../images/film2.png';
import film3 from '../../images/film3.png';
import film4 from '../../images/film4.png';
import Header from '../Header/Header';

export default function SavedMovies(props) {
    return (
        <>
            <Header  isLoggedIn={props.isLoggedIn} />
            <section className="save-movies">
                <SearchForm />
                <FilterCheckbox />
                <MoviesCardList>
                    <MoviesCard name="33 слова о дизайне" time="1ч 42м" img={film1} />
                    <MoviesCard name="33 слова о дизайне" time="1ч 42м" img={film2} />
                    <MoviesCard name="33 слова о дизайне" time="1ч 42м" img={film3} />
                    <MoviesCard name="33 слова о дизайне" time="1ч 42м" img={film4} />
                </MoviesCardList>
            </section>
            <Footer />
        </>
    );
}