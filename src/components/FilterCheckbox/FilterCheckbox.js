import React from "react";
import './FilterCheckbox.css';

export default function FilterCheckbox(props) {

    return (
        <div className="checkbox">
            <div className="checkbox__container">
                <button tipe="button" className={`checkbox__item ${!props.isSelectedShortMovie ? "isSelected" : ""}`} onClick={props.onSelectShortMovie} />
                <p className="checkbox__caption">Короткометражки</p>
            </div>
        </div>
    );
}