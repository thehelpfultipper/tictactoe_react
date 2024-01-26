import { useReducer } from 'react';
import GameContext from './game-context';

const defaultGameState = {
    isGameOn: false,
    player: []
}

const gameReducer = (state, action) => {
    let { type, val } = action;
    if (type === 'SET_GAMEON') {
        return {
            ...state,
            isGameOn: val
        }
    }

    return defaultGameState;
}

export default function GameProvider({ children }) {
    let [gameState, dispatchGameAction] = useReducer(gameReducer, defaultGameState);

    const gameOnHandler = (bool) => dispatchGameAction({ type: 'SET_GAMEON', val: bool });

    let gameContext = {
        isGameOn: gameState.isGameOn,
        setIsGameOn: gameOnHandler
    }

    return (
        <GameContext.Provider value={gameContext}>
            {children}
        </GameContext.Provider>
    )
}