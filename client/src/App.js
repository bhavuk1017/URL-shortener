import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './component/Home.js';
import Redirect from "./component/Redirect.js"

function App() {
  return (
    <div className="App">
      <div>
        <Toaster position='top-center'></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path="/:redirectFrom" element={<Redirect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
