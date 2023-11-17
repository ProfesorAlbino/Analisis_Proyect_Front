import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './page/PrincipalPage/PrincipalPage';
import Login from './page/Login/Login';
import User from './page/User/User';
import StudyRoom from './page/StudyRoom/StudyRoom';
import FormViewStudyRoom from './page/StudyRoom/FormViewStudyRoom';
import FormViewEditStudyRoom from './page/StudyRoom/FormViewEdit';
import UserAdd from './page/User/AddUser';
import Inventory from './page/Inventory/Inventory';
import InventoryAdd from './page/Inventory/AddInventory';
import InventoryType from './page/Inventory/Inventory_type';
import InventoryTypeAdd from './page/Inventory/AddInventory_type';
import Area from './page/Inventory/Area';
import AreaAdd from './page/Inventory/AddArea';
import ListTitles from './page/Title/ListTitles';
import AddTitle from './page/Title/AddTitle';
import ModifyTitle from './page/Title/ModifyTitle';
import AddCopy from './page/Copy/AddCopy';
import ListCopy from './page/Copy/ListCopy';
import ModifyCopy from './page/Copy/ModifyCopy';
import ListComputerEquipments from './page/ComputerEquipments/ListComputerEquipments';
import ModifyComputerEquipments from './page/ComputerEquipments/ModifyComputerEquipments';
import AddComputerEquipments from './page/ComputerEquipments/AddComputerEquipments';
import ListSanctionsReport from './page/SanctionsReport/ListSanctionsReport';
import AddSanctionsReport from './page/SanctionsReport/AddSanctionsReport';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <Example />

       
        <Routes>     
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
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
          <Route exact path="/ListComputerEquipments" element={<ListComputerEquipments />} />
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
          <Route exact path="/loanBook" element={<LoanBook />} />
          <Route exact path="/listLoanBook/:idUser" element={<ListLoanBook />} />
          <Route exact path="/ModifyLoanBook/:idLoanBook" element={<LoanBookModify />} />
          <Route exact path="/furnitures" element={<Furniture />} />
          <Route exact path="/furnitures/create" element={<FormViewFurniture />} />
          <Route exact path="/furnitures/edit/:id" element={<FormViewEditFurniture />} />
          <Route exact path="/studyRoomsSchedule" element={<StudyRoomSchedule />} />
          <Route exact path="/studyRoomsSchedule/create" element={<FormViewStudyRoomSchedule />} />
          <Route exact path="/studyRoomsSchedule/edit/:id" element={<FormViewEditStudyRoomSchedule />} />
          <Route exact path="/listLoanComputerEquipment" element={<ListLoanComputerEquipment />} />
          <Route exact path="/addLoanComputerEquipment" element={<AddLoanComputerEquipments />} />
          <Route exact path="/reserveLoanComputerEquipment" element={<ReserveLoanComputerEquipment />} />

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
