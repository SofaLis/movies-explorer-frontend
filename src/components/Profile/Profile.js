import React from 'react';
import Header from '../Header/Header';
import './Profile.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useValidation from "../../utils/validations";

export default function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const validationForm = useValidation()

    React.useEffect(() => {
        props.setIsErr({ text: '' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(validationForm.isValues.name, validationForm.isValues.email);
    }

    const buttonDis = props.isAddForm ? !props.isAddForm : validationForm.isValidity;

    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} />
            <section className='profile'>
                <h2 className="profile__title">{`Привет, ${currentUser.name || validationForm.isValues.name}!`}</h2>
                <form name="profile" className="profile__container" onSubmit={handleSubmit}>
                    <div className="profile__input-list">
                        <div className="profile__input-container">
                            <span className="profile__caption">Имя</span>
                            <input className={`${validationForm.isErr.name ? "profile__input profile__input_active" : "profile__input"}`} type="text" id="name" name="name"
                                required minLength="2" maxLength="40" onChange={validationForm.handleChange} value={validationForm.isValues.name} />
                        </div>
                        <span className={`${validationForm.isErr.name ? "profile_err profile_err_active" : "authorizatio_err"}`}>
                            {validationForm.isErr.name}
                        </span>
                        <div className="profile__input-container profile__input-container_email">
                            <span className="profile__caption">E-mail</span>
                            <input className={`${validationForm.isErr.email ? "profile__input profile__input_active" : "profile__input"}`}
                                type="email" id="email" name="email" pattern="^[A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4}$"
                                required onChange={validationForm.handleChange} value={validationForm.isValues.email} />
                        </div>
                        <span className={`${validationForm.isErr.email ? "profile_err profile_err_active" : "profile_err"}`}>
                            {validationForm.isErr.email}
                        </span>
                    </div>
                    <div className="profile__button-container">
                    <button type="submit" disabled={!buttonDis}
                        className={`${!props.buttonDis ? "button profile__button_submit profile__button_off-active" : "button profile__button_submit"}`} >
                        Редактировать
                    </button>
                    <span className={`${props.isErr !== '' ? "profile_err profile_err_active" : "profile_err"}`}>
                        {props.isErr.text}
                    </span>
                    </div>
                    <button type="button" className="button profile__button_logoff" onClick={props.onClick}>
                        Выйти из аккаунта
                    </button>
                </form>
            </section>
        </>
    )
}