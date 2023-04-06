import React from 'react';
// import avatar from '../images/floppa.jpg';
import avatarEdit from '../images/edit-avatar.svg';
import buttonAdd from '../images/add-button.svg';
import api from '../utils/Api';
import Card from './Card';

function Main (props) {

    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getInfo(), api.getCard()])
        .then((res) => {
            const userData = res[0];
            const cardsData = res[1];
        
            setUserName(userData.name);
            setUserDescription(userData.about);
            setUserAvatar(userData.avatar);
            setCards(cardsData);
        });
    });

    const cardsElement = cards.map((element) => 
        <Card card={element} onCardClick={props.onCardClick} />
    );

    return(
        <main className="main">
        
        <section className="profile">
            <div className="profile__bio">
                <div className="profile__avatar">
                    <img src={userAvatar} alt="Автарка профиля" className="profile__photo" />
                    <button className="profile__edit-avatar" onClick={props.onEditAvatar}>
                        <img src={avatarEdit} alt="" className="profile__avatar-button" />
                    </button>
                </div>

                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button type="button" className="profile__edit-button" onClick={props.onEditProfile}>
                    </button>
                    <p className="profile__description">{userDescription}</p>
                </div>
            </div>
    
            <button type="button" className="profile__add-button" onClick={props.onAddPlace}>
                <img src={buttonAdd} alt="Добавить фото" className="profile__add" />
            </button>
            
        </section>
            
        <section className="elements">
                {cardsElement}
        </section>
    </main>
    );
}

export default Main;