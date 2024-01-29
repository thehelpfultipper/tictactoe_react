import { useContext, useEffect, useState } from 'react';

import Card from '../UI/Card';
import Nav from '../Layout/Nav';
import Button from '../UI/Button';
import DefaultSelection from './DefaultSelection';
import NameSelection from './NameSelection';
import EndSelection from './EndSelection';
import GameContext from '../../context/game-context';

import s from './Select.module.css';

function generateRandomPlayer(symb) {
    let names = [
        'Matrix',
        'Stargazer',
        'Apollo',
        'Leviathan',
        'Nova',
        'Celestial',
        'Odyssey',
        'Quantum',
        'Voyager',
        'Cosmic',
        'Nebula',
        'Astral',
        'Galactic'
    ];

    return {
        name: names[Math.floor(Math.random() * names.length)],
        symbol: symb === 'O' ? 'X' : 'O'
    }
}

export default function Select() {
    let [isPlayerSelected, setIsPlayerSelected] = useState(false);
    let [player, setPlayer] = useState('');
    let [playerName, setPlayerName] = useState('');
    let [isExit, setIsExit] = useState(false);
    let [isBack, setIsBack] = useState(false);

    let { showBoard, players, setShowBoard, setPlayers, setIsGameOn } = useContext(GameContext);

    const playerSelectHandler = (xory) => setPlayer(xory);

    const nameSelectHandler = (name) => setPlayerName(name);

    const nxtBtnHandler = () => {
        console.log('NEXT')
        if (player === '') {
            setIsPlayerSelected(false);
            alert('Error: No Player selected!');
            return;
        } else {
            setIsPlayerSelected(true);
        }

        setIsBack(false);
    }

    const doneBtnHandler = () => {
        console.log('DONE')
        if (playerName === '') {
            alert('Error: You must enter a name!');
            return;
        } else {
            // Construct player's profiles
            const player1 = {
                name: playerName,
                symbol: player
            }

            const player2 = generateRandomPlayer(player);

            const gamePlayers = {
                human: player1,
                computer: player2
            }

            console.log(gamePlayers)
            console.log('isback on done: ' + isBack)
            setShowBoard(true);
            setPlayers(gamePlayers);
        }

        setIsBack(false);
    }

    const defaultSelection = (<div className={s["Select-selection"]}>
        <p className={s["Select-instructions"]}>Which player are you?</p>
        <div className={s["Select-choice"]}>
            <DefaultSelection onPlayerSelect={playerSelectHandler} />
        </div>
        <div className={s["Select-btn"]}>
            <Button
                active
                cs={s["btn-sm"]}
                role='button'
                onClick={nxtBtnHandler}>Next</Button>
        </div>
    </div>)

    const nameSelection = (<div className={s["Select-selection"]}>
        <p className={s["Select-instructions"]}>Player <span className={s.player}>{player}</span> what are you called?</p>
        <div className={s["Select-choice"]}>
            <NameSelection onNameSelect={nameSelectHandler} />
        </div>
        <div className={s["Select-btn"]}>
            <Button
                active
                cs={s["btn-sm"]}
                role='button'
                onClick={doneBtnHandler}>Done</Button>
        </div>
    </div>)

    useEffect(() => {
        // Reset action
        if (isBack) {
            if (showBoard) {
                setShowBoard(false);
                setPlayers({});
            } else {
                setPlayer('');
            }
        }

        if (isExit) {
            setIsGameOn(false);
            setPlayer('');
            setPlayerName('');
            setIsBack(false);
            setShowBoard(false);
        }
    }, [isBack, isExit]);

    return (
        <Card>
            <Nav
                isSelect
                player={isPlayerSelected}
                onExit={setIsExit}
                onBack={setIsBack}
            />
            {isPlayerSelected ?
                (showBoard
                    ? <EndSelection back={isBack} />
                    : nameSelection
                ) : defaultSelection}
        </Card>
    )
}