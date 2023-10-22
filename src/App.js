import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import User from './page/User/User';
import  StudyRoom from './page/StudyRoom/StudyRoom';
import FormViewStudyRoom from './page/StudyRoom/FormViewStudyRoom';
import FormViewEditStudyRoom from './page/StudyRoom/FormViewEdit';
import Furniture from './page/Furniture/Furniture';
import FormViewEditFurniture from  "./page/Furniture/FormViewEditFurniture"
import FormViewFurniture from  "./page/Furniture/FormViewFurniture"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/users" element={<User />} />
          <Route exact path="/studyRooms" element={<StudyRoom />} />
          <Route exact path="/studyRooms/create" element={<FormViewStudyRoom />} />
          <Route exact path="/studyRooms/edit/:id" element={<FormViewEditStudyRoom />} />
          <Route exact path="/furnitures" element={<Furniture/>} />
          <Route exact path="/furnitures/create" element={<FormViewFurniture/>} />
          <Route exact path="/furnitures/edit/:id" element={<FormViewEditFurniture />} />
          {/* <Route exact path="/" element={<Home />} /> */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
