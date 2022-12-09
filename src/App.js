import { useEffect, useState } from "react";
import Game from "./components/Game";
import Header from "./components/Header";
import Scoreboard from "./components/Scoreboard";
import shuffle from "./util";

const App = () => {
    const [curScore, setCurScore] = useState(0);
    const [best, setBest] = useState(0);
    const [curCards, setCurCards] = useState([[1,0], [2,0]]);
    const [curSize, setCurSize] = useState(2);
    const [used, setUsed] = useState(new Set());
    
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
        // Make sure at least one non used
        // Label it if used
        let count = 0;
        for (const i of temp){
            i[1] = used.has(i[0]);
            count += i[1];
        }

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
    }

    return(
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
    )
};

export default App;