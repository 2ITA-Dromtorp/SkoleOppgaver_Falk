import logo from './logo.svg';
import './App.css';
import MyApp from './NewComponent';
 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dette er en komponent</h1>
        <img src={logo} className="App-logo" alt="logo"/>
        <MyApp></MyApp>
      </header>
    </div>
  );
}
 
export default App;