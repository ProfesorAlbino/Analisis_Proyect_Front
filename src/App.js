import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import User from './page/User/User';
import ListTitles from './page/Title/ListTitles';
import AddTitle from './page/Title/AddTitle';
import ModifyTitle from './page/Title/ModifyTitle';




function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/users" element={<User />} />
          {/* <Route exact path="/" element={<Home />} /> */}
          <Route exact path="/listTitles" element={<ListTitles />} />
          <Route exact path="/addTitle" element={<AddTitle />} />
          <Route exact path="/editTitle/:idTitle" element={<ModifyTitle />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
