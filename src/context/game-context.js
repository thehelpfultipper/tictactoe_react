import { createContext } from "react";

const GameContext = createContext({
    isGameOn: false,
    setIsGameOn: () => { },
    player: [],
    setPlayer: () => { }
});

export default GameContext;