import { createContext } from "react";

const GameContext = createContext({
    isGameOn: false,
    setIsGameOn: () => { },
    players: {},
    setPlayers: () => { },
    showBoard: false,
    setShowBoard: () => { },
    startGame: false,
    setStartGame: () => { },
    resetBoard: false,
    setResetBoard: () => { }
});

export default GameContext;