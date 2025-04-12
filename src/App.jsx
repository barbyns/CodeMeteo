import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Meteo from './components/Meteo';
import PrevisioniItalia from './components/PrevisioniItalia';
import Centro from './components/Centro';
import MyFooter from './components/MyFooter';
import MyNav from './components/MyNav';
import Nord from './components/Nord';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 bg-dark">
        <MyNav tema="dark" />
        
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Meteo />} />
            <Route path="/Previsioni/Italia" element={<PrevisioniItalia />} />
            <Route path="/Previsioni/OggiDomani" element={<PrevisioniItalia />} />
            <Route path="/Regioni/Nord" element={<Nord />} />
            <Route path="/Regioni/Centro" element={<Centro />} />
            <Route path="/Regioni/Sud" element={<PrevisioniItalia />} />
          </Routes>
        </main>

        <MyFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
