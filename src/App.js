import { useState } from "react";
import Game from "./components/Game";
import Header from "./components/Header";
import Scoreboard from "./components/Scoreboard";
import shuffle from "./util";

const App = () => {
    const [current, setCurrent] = useState(0);
    const [best, setBest] = useState(0);
    const [currentCards, setCurrentCards] = useState([1, 2]);

    // A set to store all selected numbers
    const used = new Set();
    let currentSize = 2;
    
    // Function to generate the next batch of memory cards
    const generate = () => {
        const selected = new Set();
        // temp stores pairs of [number , isUsed]
        const temp = [];

        while (temp.length < currentSize){
            const random = Math.floor(Math.random() * (currentSize * 2)) + 1;
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
            while (temp.length < currentSize){
                const random = Math.floor(Math.random() * (currentSize * 2)) + 1;
                if (!selected.has(random) && !used.has(random)){
                    temp.push([random, 0]);
                }
            }
        }

        return temp;
    }

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
            currentSize *= 2;
        }

        const newCards = generate();
        shuffle(newCards);
        setCurrentCards(newCards);
    }

    const lose = () => {
        setCurrent(0);
        currentSize = 2;
        used.clear();

        const newCards = [1,2];
        shuffle(newCards);
        setCurrentCards(newCards);
    }

    return(
        <div>
            <Header></Header>
            <Scoreboard 
                current={current} 
                best={best}
            ></Scoreboard>
            <Game 
                cards={currentCards} 
                win={win} 
                lose={lose}
            ></Game>
        </div>
    )
};

export default App;