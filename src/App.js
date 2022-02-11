import logo from './logo.svg';
import './App.css';
import ChevronIcon from './components/icons/chevron';
import ConfigIcon from './components/icons/config';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
        <ChevronIcon
          direction={ChevronIcon.direction.down}
          className="text-white"
        />
        <ConfigIcon />
      </header>
    </div>
  );
}

export default App;
