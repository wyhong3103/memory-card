const Card = (props) => {
    return(
        <div className="card" onClick={props.callback}>
            <h3 className="card-number">{props.number}</h3>
        </div>
    )
};

export default Card;