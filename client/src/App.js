import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import Detail from './components/Detail/Detail';
import AddedCards from './components/AddedCards/AddedCards';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/pokemonaddedcards' component={AddedCards}/>
      <Route exact path='/pokemon' component={Home}/>
      <Route path='/create' component={CreatePokemon}/>
      <Route path='/pokemon/:id' component={Detail}/>
    </div>
  );
}

export default App;
