import { useEffect, useState } from "react";
import Game from "./components/Game";
import Header from "./components/Header";
import Scoreboard from "./components/Scoreboard";
import PopUp from "./components/PopUp";
import shuffle from "./util";
import './styles/App.css'

const App = () => {
    const [curScore, setCurScore] = useState(0);
    const [best, setBest] = useState(0);
    const [curCards, setCurCards] = useState([[1,0], [2,0]]);
    const [curSize, setCurSize] = useState(2);
    const [used, setUsed] = useState(new Set());
    const [popUp, setPopUp] = useState(true);
    const [popUpMsg, setPopUpMsg] = useState("Welcome to 2xemory! You can only select card that has not been selected in the previous round! Score as high as possible!");
    
    // Function to generate the next batch of memory cards
    const generate = () => {
        const selected = new Set();
        // temp stores pairs of [number , isUsed]
        const temp = [];

        while (temp.length < curSize){
            const random = Math.floor(Math.random() * (curSize * (1.5))) + 1;
            if (!selected.has(random)){
                selected.add(random);
                temp.push([random, 0]);
            }
        }

        // Counting how many used element in the array
        // Label it if used
        let count = 0;
        for (const i of temp){
            i[1] = used.has(i[0]);
            count += i[1];
        }

        // Make sure at least one non used
        if (count === temp.length){
            temp.pop()
            while (temp.length < curSize){
                const random = Math.floor(Math.random() * (curSize * 2)) + 1;
                if (!selected.has(random) && !used.has(random)){
                    temp.push([random, 0]);
                }
            }
        }

        return temp;
    }

    // Make sure only run certain functions after curScore has updated
    useEffect(
        () => {
            setBest(prev => Math.max(curScore, prev));
            setCurSize(prev => (curScore >= prev ? prev * 2 : prev));
            const newCards = generate();
            shuffle(newCards);
            setCurCards(newCards);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [curScore])

    // Make sure only run certain functions after curSize has updated
    useEffect(
        () => {
            const newCards = generate();
            shuffle(newCards);
            setCurCards(newCards);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [curSize])

    const win = (winningNumber) => {
        setUsed(prev => {
            const temp = new Set(prev);
            temp.add(winningNumber);
            return temp;
        });
        setCurScore(prevCur => {
            return prevCur+1;
        });
    }

    const lose = () => {
        setUsed(new Set());
        setCurScore(0);
        setCurSize(2);
        setPopUpMsg("Oh no, you lost! Try harder!");
        togglePopUp();
    }

    const togglePopUp = () => {
        setPopUp(prev => !prev);
    }

    return(
        <div className="main-container">
            {
                popUp === true ? 
                (() => {
                    return(
                        <div className="blur-container">
                            <div className="blur-bg"></div>
                            <PopUp msg={popUpMsg} toggle={togglePopUp}></PopUp>
                        </div>
                    )
                })() : 
                null
            }
            <div>
                <Header></Header>
                <Scoreboard
                    current={curScore}
                    best={best}
                ></Scoreboard>
                <Game
                    cards={curCards}
                    win={win}
                    lose={lose}
                ></Game>
            </div>
        </div>
    )
};

export default App;