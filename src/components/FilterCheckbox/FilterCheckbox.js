import React from "react";
import './FilterCheckbox.css';
import { useCallback, useState } from "react";

export default function FilterCheckbox() {

    const [isSelectedShortMovie, setIsSelectedIsShortMovie] = useState(false);
    const onSelectShortMovie = useCallback(
        () => setIsSelectedIsShortMovie(!isSelectedShortMovie),
        [isSelectedShortMovie]
    );

    return (
        <div className="checkbox">
            <div className="checkbox__container">
                <button tipe="button" className={`checkbox__item ${isSelectedShortMovie ? "isSelected" : ""}`} onClick={onSelectShortMovie} />
                <p className="checkbox__caption">Короткометражки</p>
            </div>
        </div>
    );
}