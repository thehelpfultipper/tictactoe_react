import Start from './Components/Layout/Start';

import s from './App.module.css';

function App() {
  return (
    <div className={s.App}>
      <Start />
      <footer className={s["App-footer"]}>
        <div className={s["foot-1"]}>
          With 🤍 from <a
            className={s["App-link"]}
            href="https://thehelpfultipper.com"
            target="_blank"
            rel="noopener noreferrer"
          >The Helpful Tipper</a>
        </div>
        <div className={s["foot-2"]}>
          ©{new Date().getFullYear()}, The Helpful Tipper. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
