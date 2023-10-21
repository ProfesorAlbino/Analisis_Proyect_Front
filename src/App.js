import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import User from './page/User/User';



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/users" element={<User />} />
          {/* <Route exact path="/" element={<Home />} /> */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
