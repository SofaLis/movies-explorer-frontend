import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";
import HeaderLogOff from '../HeaderLogOff/HeaderLogOff';
import HeaderLogIn from '../HeaderLogIn/HeaderLogIn';
import Navigation from '../Navigation/Navigation';

export default function Header(props) {
    const [isOpen, setIsOpen] = React.useState(false);

    function handleClickOpen() {
        setIsOpen(true)
    }

    function handleClickClose() {
        setIsOpen(false)
    }

    return (
        <header className="header">
            <div className="header__container">
                <Link className="link" to="/">
                    <img src={logo} alt="Логотип" className="header__logo" />
                </Link>
                {props.isLoggedIn ? <HeaderLogIn onClick={handleClickOpen} /> : <HeaderLogOff />}
            </div>
            <Navigation isOpen={isOpen} onClick={handleClickClose} />
        </header >
    );
}