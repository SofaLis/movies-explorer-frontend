import { useCallback, useState } from "react";
import React from 'react';
import './FilterCheckbox.css';


export default function FilterCheckbox(props) {

    const [isShort, setIsShort] = useState(false);
    function onSelectShort () {
        isShort ? setIsShort(false) : setIsShort(true);
    }
    return (
        <div className="checkbox">
            <div className="checkbox__container">
                <div className={`checkbox__input ${isShort ? "isSelected" : ""}`} onClick={onSelectShort} />
                <p className="checkbox__text">Короткометражки</p>
            </div>
        </div>
    );
}