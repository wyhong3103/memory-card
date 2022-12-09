import '../styles/PopUp.css';

const PopUp = (props) => {
    return(
        <div className='pop-up-container'>
            <div className="pop-up">
                <h1>Message</h1>
                <p>{props.msg}</p>
                <button onClick={props.toggle}>OK</button>
            </div>
        </div>
    )
};

export default PopUp;