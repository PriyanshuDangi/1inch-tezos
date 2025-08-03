import React from 'react';
import Header from './components/Header';
import DEXInterface from './components/DEXInterface';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <DEXInterface />
      <Footer />
    </div>
  );
}

export default App;
