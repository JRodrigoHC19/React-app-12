import React from 'react';
import './App.css';
import CharacterList from './CharacterList';
import DataLoader from './DataLoader';
import CharacterLoader from './CharacterLoader';

function App() {

  return (
    <div className='App'>
      <CharacterLoader />
    </div>

  );
}

export default App;
