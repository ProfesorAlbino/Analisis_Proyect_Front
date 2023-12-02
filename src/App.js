import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, json } from 'react-router-dom';

import { decryptAES } from './scripts/AES-256';

import Register from './page/Login/Register';
import Login from './page/Login/Login';
import User from './page/User/User';
import StudyRoom from './page/StudyRoom/StudyRoom';
import FormViewStudyRoom from './page/StudyRoom/FormViewStudyRoom';
import FormViewEditStudyRoom from './page/StudyRoom/FormViewEdit';
import UserAdd from './page/User/AddUser';
import Inventory from './page/Inventory/Inventory';
import InventoryAdd from './page/Inventory/AddInventory';
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
import LoanBook from './page/LoanBook/AddLoanBook';
import NavAndSide from '../src/layout/Dashboard';
import ListLoanBook from './page/LoanBook/ListLoanBook';
import LoanBookModify from './page/LoanBook/ModifyLoanBook';
import Home from './layout/Home';
import Footer from './layout/Footer';
import Furniture from './page/Furniture/Furniture';
import FormViewEditFurniture from "./page/Furniture/FormViewEditFurniture"
import FormViewFurniture from "./page/Furniture/FormViewFurniture"
import FormViewStudyRoomSchedule from './page/StudyRoomSchedule/FormViewStudyRoomSchedule';
import StudyRoomSchedule from './page/StudyRoomSchedule/StudyRoomSchedule';
import FormViewEditStudyRoomSchedule from './page/StudyRoomSchedule/FormViewEditStudyRoomSchedule';
import FormViewEditLoanVehicle from './page/LoanVehicle/FormViewEditLoanVehicle';
import FormViewLoanVehicle from './page/LoanVehicle/FormViewLoanVehicle';
import ListLoanComputerEquipment from './page/LoanComputerEquipment/ListLoanComputerEquipment';
import AddLoanComputerEquipments from './page/LoanComputerEquipment/AddLoanComputerEquipments';
import ReserveLoanComputerEquipment from './page/LoanComputerEquipment/ReserveLoanComputerEquipment';
import ClassRoom from './page/ClassRooms/ClassRoom';
import RegisterClassRoom from './page/ClassRooms/RegisterClassRoom';
import RegisterLoanClassRoom from './page/LoanClassRooms/RegisterLoanClassRoom';
import EditClassRoom from './page/ClassRooms/EditClassRoom';
import LoanClassRoom from './page/LoanClassRooms/LoanClassRoom';
import EditLoanClassRoom from './page/LoanClassRooms/EditLoanClassRoom';
import LoanVehicle from './page/LoanVehicle/LoanVehicle';
import MoreInformationComputerEquipment from './page/ComputerEquipments/MoreInformationComputerEquipments';
import AdminListLoan from './page/LoanComputerEquipment/Admin/AdminListLoan';
import ViewLoanClassRoom from './page/LoanClassRooms/ViewLoanClassRoom';
import AdminLoanClassRoom from './page/LoanClassRooms/AdminLoanClassRoom';
import LoanFieldSport from './page/LoanSports/LoanFieldSport';
import RegisterLoanFieldSport from './page/LoanSports/RegisterLoanFieldSport';
import EditFieldSport from './page/LoanSports/EditFieldSport';
import LoanStudyRoom from './page/LoanStudyRoom/LoanStudyRoom';
import FormViewLoanStudyRoom from './page/LoanStudyRoom/FormViewLoanStudyRoom';
import FormViewEditLoanStudyRoom from './page/LoanStudyRoom/FormViewEditLoanStudyRoom';

function App() {
  
  const user = decryptAES(sessionStorage.getItem('user'));
  const isUserAdmin = user ? JSON.parse(user).role === 'Administrador' : false;

  return (
    <div className="App">
      <Router>
        <NavAndSide />


        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/users" element={isUserAdmin ? <User /> : <Home />} />
          <Route exact path="/users/create" element={isUserAdmin ? <UserAdd /> : <Home />} /> {/* IMPLEMENTAR IGUAL PARA LA SEGURIDAD, PUEDEN SACAR MÁS COSAS EN CONSTANTES  */}
          <Route exact path="/inventory" element={isUserAdmin ? <Inventory /> : <Home />} />
          <Route exact path="/inventory/create" element={isUserAdmin ? <InventoryAdd /> : <Home />} />
          <Route exact path="/inventory/area" element={isUserAdmin ? <Area /> : <Home />} />
          <Route exact path="/inventory/area/create" element={isUserAdmin ? <AreaAdd /> : <Home />} />
          <Route exact path="/studyRooms" element={<StudyRoom />} />
          <Route exact path="/studyRooms/create" element={<FormViewStudyRoom />} />
          <Route exact path="/studyRooms/edit/:id" element={<FormViewEditStudyRoom />} />
          <Route exat path="/classRoom" element={<ClassRoom />} />
          <Route exat path="/classRoom/RegisterClassRoom" element={<RegisterClassRoom />} />
          <Route exat path="/classRoom/EditClassRoom/:id" element={<EditClassRoom />} />
          <Route exact path="/ListComputerEquipments" element={<ListComputerEquipments />} />
          <Route exact path="/ModifyComputerEquipments" element={<ModifyComputerEquipments />} />
          <Route exact path="/AddComputerEquipments" element={<AddComputerEquipments />} />
          <Route exact path="/ListSanctionsReport" element={<ListSanctionsReport />} />
          <Route exact path="/AddSanctionsReport" element={<AddSanctionsReport />} />
          <Route exact path="/loanClassRoom/RegisterLoanClassRoom" element={<RegisterLoanClassRoom/>}/>
          <Route exact path='/LoanClassRoom' element={<LoanClassRoom/>}/>
          <Route exat path="/LoanClassRooms/EditLoanClassRoom/:id" element={<EditLoanClassRoom/>}/>
          <Route exact path='/loanClassRooms/ViewLoanClassRoom/:id' element={<ViewLoanClassRoom/>}/>
          <Route exact path='/AdminLoanClassRoom' element={<AdminLoanClassRoom/>}/>
          <Route exact path='/LoanFieldSport' element={<LoanFieldSport/>}/>
          <Route exact path='/RegisterLoanFieldSport' element={<RegisterLoanFieldSport/>}/>
          <Route exact path='/LoanSports/EditFieldSport/:id' element={<EditFieldSport/>}/>

          <Route exact path="/listTitles" element={<ListTitles />} />
          <Route exact path="/addTitle" element={<AddTitle />} />
          <Route exact path="/editTitle/:idTitle" element={<ModifyTitle />} />
          <Route exact path="/addCopy/:idTitle" element={<AddCopy />} />
          <Route exact path="/listCopy/:idTitle" element={<ListCopy />} />
          <Route exact path="/editCopy/:idTitle" element={<ModifyCopy />} />
          <Route exact path="/loanBook" element={<LoanBook />} />
          <Route exact path="/listLoanBook" element={<ListLoanBook />} />
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
          <Route exact path="/loanVehicle/create" element={<FormViewLoanVehicle />} />
          <Route exact path="/loanVehicle" element={<LoanVehicle />} />
          <Route exact path="/loanVehicle/edit/:id" element={<FormViewEditLoanVehicle />} />
          <Route exact path="/moreInformationComputerEquipment" element={<MoreInformationComputerEquipment />} />
          <Route exact path="/adminListLoan" element={<AdminListLoan />} />
          <Route exact path="/loanStudyRoom" element={<LoanStudyRoom />} />
          <Route exact path="/loanStudyRoom" element={<LoanStudyRoom/>} />
          <Route exact path="/loanStudyRoom/create" element={<FormViewLoanStudyRoom />} />
          <Route exact path="/loanStudyRoom/edit/:id" element={<FormViewEditLoanStudyRoom />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
