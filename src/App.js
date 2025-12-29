import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer123';
import MatchList from './components/MatchList';
import './App.css'; // Bu da stillerin düzgün çalışması için gerekli

function App() {
  return (
    <div className="App">
      <Header />
      <MatchList />
      <Footer />
    </div>
  );
}

export default App;