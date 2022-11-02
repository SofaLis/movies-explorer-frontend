import React from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import MoviesCard from '../MoviesCard/MoviesCard';
import film1 from '../../images/film1.png';
import film2 from '../../images/film2.png';
import film3 from '../../images/film3.png';
import film4 from '../../images/film4.png';
import film5 from '../../images/film5.png';
import film6 from '../../images/film6.png';
import film7 from '../../images/film7.png';
import film8 from '../../images/film8.png';
import film9 from '../../images/film9.png';
import film10 from '../../images/film10.png';
import film11 from '../../images/film11.png';
import film12 from '../../images/film12.png';
import Header from '../Header/Header';

export default function Movies(props) {
    return (
        <>
            <Header  isLoggedIn={props.isLoggedIn} />
            <section className="movies">
                <SearchForm />
                <FilterCheckbox />
                <MoviesCardList>
                    <MoviesCard name="33 слова о дизайне" time="1ч 42м" img={film1} />
                    <MoviesCard name="33 слова о дизайне" time="1ч 42м" img={film2} />
                    <MoviesCard name="33 слова о дизайне" time="1ч 42м" img={film3} />
                    <MoviesCard name="33 слова о дизайне" time="1ч 42м" img={film4} />
                    <MoviesCard name="33 слова о дизайне" time="1ч 42м" img={film5} />
                    <MoviesCard name="33 слова о дизайне" time="1ч 42м" img={film6} />
                    <MoviesCard name="33 слова о дизайне" time="1ч 42м" img={film7} />
                    <MoviesCard name="33 слова о дизайне" time="1ч 42м" img={film8} />
                    <MoviesCard name="33 слова о дизайне" time="1ч 42м" img={film9} />
                    <MoviesCard name="33 слова о дизайне" time="1ч 42м" img={film10} />
                    <MoviesCard name="33 слова о дизайне" time="1ч 42м" img={film11} />
                    <MoviesCard name="33 слова о дизайне" time="1ч 42м" img={film12} />
                </MoviesCardList>
            </section>
            <Footer />
        </>
    );
}