import { useState } from "react";
import Header from "./components/Header";
import Scoreboard from "./components/Scoreboard";

const App = () => {
    const [current, setCurrent] = useState(0);
    const [best, setBest] = useState(0);
    const [currentSize, setCurrentSize] = useState(2);
    const [used, setUsed] = useState(new Set());
    const [currentCards, setCurrentCards] = useState([1, 2]);

    const win = () => {
        let curScore = 0;
        setCurrent(prev => {
            curScore = prev;
            return prev+1;
        });

        if (curScore > best){
            setBest(curScore);
        }

        //reset function
    }

    const lose = () => {
        setCurrent(0);

        //reset function
    }

    return(
        <div>
            <Header></Header>
            <Scoreboard current={current} best={best}></Scoreboard>
        </div>
    )
};

export default App;