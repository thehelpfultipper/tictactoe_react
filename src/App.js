import { useContext } from 'react';

import Start from './Components/Start';
import Footer from './Components/Layout/Footer';
import GameContext from './context/game-context';

import s from './App.module.css';

function App() {
  return (
    <div className={s.App}>
      <Start />
      <Footer />
    </div>
  );
}

export default App;
