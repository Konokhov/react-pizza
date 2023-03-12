import Header from './components/Header';
import Home from './pages/Home';
import NotFaund from './pages/NotFaund';
import Cart from './pages/Cart';

import { createContext, useState } from 'react';
import { Routes, Route } from "react-router-dom";

import './scss/app.scss'; 

export const SearchContext = createContext();

const App = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper"> 
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='*' element={<NotFaund />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div> 
  );
}

export default App;