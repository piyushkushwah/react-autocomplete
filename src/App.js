import './App.css';
import Autocomplete from './components/autocomplete/autocomplete';
import data from './assets/movies.json';
import { useState } from 'react';

function App() {

  const [userInputValue, setUserInputValue] = useState('')

  const getVlaueFromAutocomplete = (val) => {
    setUserInputValue(val);
  }

  return (
    <div className="App">
      <div className="App-autocomplete">
        <h3>React Auto Complete</h3>
        <Autocomplete
          getVlaueFromAutocomplete={getVlaueFromAutocomplete} 
          suggestions={data.movies}/>
      </div>
     {
       userInputValue.length !== 0 ? 
        <div className="App-show-value">
          {'name : '+userInputValue}
        </div>
      :null
     }
    </div>
  );
}

export default App;
