import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Houses from './Houses';
import Scarezones from './Scarezones';
import Shows from './Shows';
import Account from './Account';

function App() {

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Account/>}/>
          <Route path="/houses" element={<Houses/>}/>
          <Route path="/scarezones" element={<Scarezones/>}/>
          <Route path="/shows" element={<Shows/>}/>
          <Route path="/account" element={<Account/>}/>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
