import buttonDelete from '../images/trash-icon.svg';
import buttonLike from '../images/like.svg';

function Card (props) {

    function handleClick() {
        props.onCardClick(props.card);
    }

    return(
        <article className="element">
    
            <div className="element__avatar">
                <img className="element__photo" src={props.card.link} alt={props.card.name} onClick={handleClick} />
                    <button className="element__trash">
                        <img src={buttonDelete} alt="Удалить фотографию" className="element__trash-icon" />
                    </button>
            </div>
                    
            <div className="element__card">
                <h2 className="element__description">{props.card.name}</h2>
                <div className="element__container">
                    <button type="button" className="element__like">
                        <img src={buttonLike} alt="Поставить лайк" className="element__like-icon" />
                    </button>
                    <p className="element__like-number">{props.card.likes.length}</p>
                </div>
            </div>
                    
        </article>
    );
}

export default Card;