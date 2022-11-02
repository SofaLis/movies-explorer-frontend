import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
// import { Switch, Route, Link } from "react-router-dom";
import HeaderLogIn from '../HeaderLogIn/HeaderLogIn';
import HeaderLogOff from '../HeaderLogOff/HeaderLogOff';
import { Link } from 'react-router-dom';

export default function Header(props) {

    return (
        <header className="header">
            <Link className="link" to="/">
                <img src={logo} alt="Логотип" className="header__logo" />
            </Link>
            <div >
                {props.isLoggedIn ? <HeaderLogIn /> : <HeaderLogOff /> }
            </div>
        </header >
    );
}