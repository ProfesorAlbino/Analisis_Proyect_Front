import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';

import User from './page/User/User';
import StudyRoom from './page/StudyRoom/StudyRoom';
import FormViewStudyRoom from './page/StudyRoom/FormViewStudyRoom';
import FormViewEditStudyRoom from './page/StudyRoom/FormViewEdit';
import UserAdd from './page/User/UserAdd';
import Inventory from './page/Inventory/Inventory';
import InventoryAdd from './page/Inventory/InventoryAdd';
import InventoryType from './page/Inventory/Inventory_type';
import InventoryTypeAdd from './page/Inventory/Inventory_typeAdd';
import Area from './page/Inventory/Area';
import AreaAdd from './page/Inventory/AreaAdd';
import ListTitles from './page/Title/ListTitles';
import AddTitle from './page/Title/AddTitle';
import ModifyTitle from './page/Title/ModifyTitle';
import AddCopy from './page/Copy/AddCopy';
import ListCopy from './page/Copy/ListCopy';
import ModifyCopy from './page/Copy/ModifyCopy';
import ComputerEquipments from './page/ComputerEquipments/ListComputerEquipments';
import ModifyComputerEquipments from './page/ComputerEquipments/ModifyComputerEquipments';
import AddComputerEquipments from './page/ComputerEquipments/AddComputerEquipments';
import ListSanctionsReport from './page/SanctionsReport/ListSanctionsReport';
import AddSanctionsReport from './page/SanctionsReport/AddSanctionsReport';
import ClassRoom from './page/ClassRooms/ClassRoom';
import RegisterClassRoom from './page/ClassRooms/RegisterClassRoom';
import RegisterLoanClassRoom from './page/LoanClassRooms/RegisterLoanClassRoom';
import EditClassRoom from './page/ClassRooms/EditClassRoom';
import LoanClassRoom from './page/LoanClassRooms/LoanClassRoom';
import EditLoanClassRoom from './page/LoanClassRooms/EditLoanClassRoom';


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
          <Route exat path="/classRoom" element={<ClassRoom/>}/>
          <Route exat path="/classRoom/RegisterClassRoom" element={<RegisterClassRoom/>}/>
          <Route exat path="/classRoom/EditClassRoom/:id" element={<EditClassRoom/>}/>
          <Route exact path="/inventory/inventoryType" element={<InventoryType />} />
          <Route exact path="/inventory/inventoryType/create" element={<InventoryTypeAdd />} />
          <Route exact path="/inventory/area" element={<Area />} />
          <Route exact path="/inventory/area/create" element={<AreaAdd />} />
          <Route exact path="/ListComputerEquipments" element={<ComputerEquipments />} />
          <Route exact path="/ModifyComputerEquipments" element={<ModifyComputerEquipments />} />
          <Route exact path="/AddComputerEquipments" element={<AddComputerEquipments />} />
          <Route exact path="/ListSanctionsReport" element={<ListSanctionsReport />} />
          <Route exact path="/AddSanctionsReport" element={<AddSanctionsReport />} />
          <Route exact path="/loanClassRoom/RegisterLoanClassRoom" element={<RegisterLoanClassRoom/>}/>
          <Route exact path='/LoanClassRoom/LoanClassRoom' element={<LoanClassRoom/>}/>
          <Route exat path="/LoanClassRoom/EditLoanClassRoom/:id" element={<EditLoanClassRoom/>}/>

          {/* <Route exact path="/" element={<Home />} /> */}
          <Route exact path="/listTitles" element={<ListTitles />} />
          <Route exact path="/addTitle" element={<AddTitle />} />
          <Route exact path="/editTitle/:idTitle" element={<ModifyTitle />} />
          <Route exact path="/addCopy/:idTitle" element={<AddCopy />} />
          <Route exact path="/listCopy/:idTitle" element={<ListCopy />} />
          <Route exact path="/editCopy/:idTitle" element={<ModifyCopy />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
