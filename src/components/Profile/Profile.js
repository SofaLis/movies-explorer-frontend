import React from 'react';
import Header from '../Header/Header';
import './Profile.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function Profile(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value)
    };

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    };

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(name, email);
    }

    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} />
            <section className='profile'>
                <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
                <form name="profile" className="profile__container" onSubmit={handleSubmit}>
                    <div className="profile__input-list">
                        <div className="profile__input-container">
                            <span className="profile__caption">Имя</span>
                            <input className="profile__input" type="text" id="name" name="name"
                                required minLength="2" maxLength="40" onChange={handleChangeName} value={currentUser.name || ''} />
                        </div>
                        <div className="profile__input-container">
                            <span className="profile__caption">E-mail</span>
                            <input className="profile__input" type="email" id="email" name="email"
                                required onChange={handleChangeEmail} value={currentUser.email || ''} />
                        </div>
                    </div>
                    <button type="submit" className="profile__button profile__button_submit" onClick={props.onClickUpdate}>
                        Редактировать
                    </button>
                    <button type="button" className="profile__button profile__button_logoff" onClick={props.onClick}>
                        Выйти из аккаунта
                    </button>
                </form>
            </section>
        </>
    )
}