import '../styles/Scoreboard.css'

const Scoreboard = (props) => {
    return(
        <div className="scoreboard">
            <h2>Current : {props.current}</h2>
            <h2>Best : {props.best}</h2>
        </div>
    )
};

export default Scoreboard;