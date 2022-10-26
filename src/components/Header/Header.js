import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
// import { Switch, Route, Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Логотип" className="header__logo" />
            <div >
                
            </div>
        </header >
    );
}