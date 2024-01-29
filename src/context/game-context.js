import { createContext } from "react";

const GameContext = createContext({
    isGameOn: false,
    setIsGameOn: () => { },
    players: {},
    setPlayers: () => { },
    showBoard: false,
    setShowBoard: () => { },
    startGame: false,
    setStartGame: () => { }
});

export default GameContext;