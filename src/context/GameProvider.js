import { useReducer } from 'react';
import GameContext from './game-context';

const defaultGameState = {
    isGameOn: false,
    players: {},
    showBoard: false,
    startGame: false,
    resetBoard: false
}

const gameReducer = (state, action) => {
    let { type, val } = action;
    if (type === 'SET_GAMEON') {
        return {
            ...state,
            isGameOn: val
        }
    }

    if(type==='SET_SHOWBOARD') {
        return {
            ...state,
            showBoard: val
        }
    }

    if(type==='SET_PLAYERS') {
        return {
            ...state,
            players: val
        }
    }

    if(type==='SET_STARTGAME') {
        return {
            ...state,
            startGame: val
        }
    }

    if(type==='SET_RESETBOARD') {
        return {
            ...state,
            resetBoard: val
        }
    }

    return defaultGameState;
}

export default function GameProvider({ children }) {
    let [gameState, dispatchGameAction] = useReducer(gameReducer, defaultGameState);

    const gameOnHandler = (bool) => dispatchGameAction({ type: 'SET_GAMEON', val: bool });

    const showBoardHandler = (bool) => dispatchGameAction({ type: 'SET_SHOWBOARD', val: bool });

    const playersHandler = (obj) => dispatchGameAction({ type: 'SET_PLAYERS', val: obj});

    const startGameHandler = (bool) => dispatchGameAction({ type: 'SET_STARTGAME', val: bool });

    const resetBoardHandler = (bool) => dispatchGameAction({ type: 'SET_RESETBOARD', val: bool });

    let gameContext = {
        isGameOn: gameState.isGameOn,
        setIsGameOn: gameOnHandler,
        showBoard: gameState.showBoard,
        setShowBoard: showBoardHandler,
        players: gameState.players,
        setPlayers: playersHandler,
        startGame: gameState.startGame,
        setStartGame: startGameHandler,
        resetBoard: gameState.resetBoard,
        setResetBoard: resetBoardHandler
    }

    return (
        <GameContext.Provider value={gameContext}>
            {children}
        </GameContext.Provider>
    )
}