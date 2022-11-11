import React from 'react';
import './SearchForm.css';

export default function SearchForm(props) {
    return (
        <form className="search-form" onSubmit={props.onSubmit}>
            <div className="search-form__input-container">
                <input  type="text" placeholder="Фильм" id="search-form" name="search-form" required
                className={`${props.isErr ? "search-form__input search-form__input_active" : "search-form__input"}`} 
                onChange={props.onChange} />
                <button className="button search-form__button"></button>
            </div>
            <span className={`${props.isErr ? "search-form_err search-form_err_active" : "search-form_err"}`}>
                Введите название фильма или ключевое слово
            </span>
        </form>
    );
}