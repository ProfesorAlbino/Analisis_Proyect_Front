import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* De esta forma se crean las rutas */}
          {/* <Route exact path="/" element={<Home />} /> */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
