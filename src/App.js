import { useState } from "react";
import Game from "./components/Game";
import Header from "./components/Header";
import Scoreboard from "./components/Scoreboard";

const App = () => {
    const [current, setCurrent] = useState(0);
    const [best, setBest] = useState(0);
    const [currentSize, setCurrentSize] = useState(2);
    const [currentCards, setCurrentCards] = useState([1, 2]);

    // A set to store all selected numbers
    const used = new Set();

    const win = () => {
        let curScore = 0;
        setCurrent(prev => {
            curScore = prev;
            return prev+1;
        });

        if (curScore > best){
            setBest(curScore);
        }

        if (curScore >= currentSize){
            setCurrentSize(prev => prev * 2);
        }

        //reset function
    }

    const lose = () => {
        setCurrent(0);
        setCurrentSize(2);
        used.clear();

        //reset function
    }

    return(
        <div>
            <Header></Header>
            <Scoreboard current={current} best={best}></Scoreboard>
            <Game cards={currentCards}></Game>
        </div>
    )
};

export default App;