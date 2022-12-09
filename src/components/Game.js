import Card from "./Card";
import '../styles/Game.css';

const Game = (props) => {
    return(
        <div className="game">
            {
                props.cards.map(
                    (item, index) => {
                        return(
                            <Card 
                                key={index} 
                                number={item[0]} 
                                callback={item[1] === true ? props.lose : props.win}
                            ></Card>
                        )
                    }
                )
            }
        </div>
    )
};

export default Game;