import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './assets/pages/Home';
import RegisterFan from './assets/pages/RegisterFan';
import Success from './assets/pages/Sucess'; // Note que estamos usando a grafia correta do seu arquivo
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterFan />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;