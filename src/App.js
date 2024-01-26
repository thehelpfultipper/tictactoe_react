import { useContext } from 'react';

import Start from './Components/Layout/Start';
import Footer from './Components/Layout/Footer';
import GameContext from './context/game-context';

import s from './App.module.css';

function App() {
  let { isGameOn, setIsGameOn } = useContext(GameContext);

  const gameOnHandler = () => setIsGameOn(true);

  return (
    <div className={s.App}>
      <Start onGameOn={gameOnHandler} />
      {isGameOn && console.log('CLICKED!')}
      <Footer />
    </div>
  );
}

export default App;
