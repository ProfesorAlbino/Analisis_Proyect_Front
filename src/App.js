import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';



import User from './page/User/User';
import  StudyRoom from './page/StudyRoom/StudyRoom';
import FormViewStudyRoom from './page/StudyRoom/FormViewStudyRoom';
import FormViewEditStudyRoom from './page/StudyRoom/FormViewEdit';
import UserAdd from './page/User/UserAdd';
import Inventory from './page/Inventory/Inventory';
import InventoryAdd from './page/Inventory/InventoryAdd';
import InventoryType from './page/Inventory/Inventory_type';
import InventoryTypeAdd from './page/Inventory/Inventory_typeAdd';
import Area from './page/Inventory/Area';
import AreaAdd from './page/Inventory/AreaAdd';

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
          <Route exact path="/users/create" element={<UserAdd />} />
          <Route exact path="/inventory" element={<Inventory />} />
          <Route exact path="/inventory/create" element={<InventoryAdd />} />
          <Route exact path="/inventory/inventoryType" element={<InventoryType />} />
          <Route exact path="/inventory/inventoryType/create" element={<InventoryTypeAdd />} />
          <Route exact path="/inventory/area" element={<Area />} />
          <Route exact path="/inventory/area/create" element={<AreaAdd />} />
          {/* <Route exact path="/" element={<Home />} /> */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
