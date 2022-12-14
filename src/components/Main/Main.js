import React from 'react';
import './Main.css';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

export default function Main(props) {
    return (
        <main className="main">
            <Header isLoggedIn={props.isLoggedIn} />
            <div className="main__baner">
                <Promo />
                <NavTab />
            </div>
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
            <Footer />
        </main>
    );
}