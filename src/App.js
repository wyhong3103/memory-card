import { useState } from "react";
import Header from "./components/Header";

const App = () => {
    const [current, setCurrent] = useState(0);
    const [best, setBest] = useState(0);
    const [currentSize, setCurrentSize] = useState(2);
    const [used, setUsed] = useState(new Set());

    return(
        <div>
        </div>
    )
};

export default App;