import React from 'react';
import './SearchForm.css';

export default function SearchForm(props) {
    return (
        <form className="search-form">
            <div className="search-form__input-container">
                <input className="search-form__input" type="text" placeholder="Фильм" 
                id="search-form" name="search-form" />
                <button className="button search-form__button"></button>
            </div>
        </form>
    );
}