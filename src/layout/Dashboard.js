
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Accordion from 'react-bootstrap/Accordion';
import { VscThreeBars } from "react-icons/vsc";
import { Link } from "react-router-dom";

import { decryptAES } from '../scripts/AES-256';

const options = [
  {
    name: 'Enable both scrolling & backdrop',
    scroll: true,
    backdrop: true,
  },
];
function OffCanvas({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const user = sessionStorage.getItem('user') && decryptAES(sessionStorage.getItem('user'));

  const onClick = () => {
    setShow(false);
  }

  const logout = () => {
    sessionStorage.removeItem('user');
    window.location.href = '/login';
  }

  return (
    <>
      {/* //-------------------------------Navbar------------------------ */}
      <div>
        <Navbar className="colorNav">
          <Container>
            <Button variant="primary" onClick={toggleShow} className="me-2 start colorButton">
              <VscThreeBars />
            </Button>

            <Navbar.Brand href="/">
              SIPR
              <img
                srcSet='/RG.png'
                src="RG.png"
                width="130"
                height="40"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Navbar.Brand>

          </Container>
        </Navbar>
      </div>
      {/* //------------------------------------------------------------ */}

      {/* //----------------------------SideBar------------------------- */}
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>SIPR</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

          <Accordion defaultActiveKey="-1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Prestamos de Biblioteca</Accordion.Header>
              <Accordion.Body>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to={"/listLoanBook"}>Libros</Link>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12"  to={"/loanStudyRoom"}>Salas de Estudio</Link>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to={`/listLoanComputerEquipment?idUser=${4}`}>Equipo Informático</Link>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/ListComputerEquipments">Informático</Link>

              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Prestamos</Accordion.Header>
              <Accordion.Body>
                <button type="button" className="btn btn-outline-primary mb-2 col-12" >Cancha</button>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/loanVehicle">Vehiculos</Link>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to={"/LoanClassRoom"}>Aulas y Laboratorios</Link>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Administrativos</Accordion.Header>
              <Accordion.Body>
                <div className="row">
                  <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/inventory">Inventario</Link>
                  <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/listTitles">Libros</Link>
                  <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/users">Usuarios</Link>
                  <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/studyRooms">Salas de estudio</Link>
                  <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/studyRoomsSchedule">Horario de Salas de estudio</Link>
                  <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/furnitures">Muebles de Salas de estudio</Link>
                  <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/admLoanVehicle">Servicio de Transporte</Link>
                  <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/classRoom">Aulas</Link>
                  <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/adminListLoan">Equipos Informaticos</Link>
                  <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/adminLoanClassRoom">Prestamos Aulas y Laboratrios</Link>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Sanciones</Accordion.Header>
              <Accordion.Body>
                <div className="row">
                  <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/ListSanctionsReport">Reporte de sanciones</Link>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Offcanvas.Body>
        <Offcanvas.Header>
          <footer className="footer mt-auto col-12 py-3 bg-light">
            <div className="container">
              <label className="text">SIPR</label>
              {user ? <button type="button" className="btn btn-outline-primary ms-4 button-footer" onClick={logout}>Cerrar Sesión</button> :
                <Link type="button" className="btn btn-outline-primary ms-4" to="/login" onClick={onClick}>Iniciar Sesión</Link>}
              {/* <button type="button" className="btn btn-primary ms-2 button-footer">Iniciar Sesión</button> */}
            </div>
          </footer>
        </Offcanvas.Header>
      </Offcanvas>
      {/* //------------------------------------------------------------ */}
    </>
  );
}

export default function NavAndSide() {
  return (
    <div className='col-12'>
      <OffCanvas key={options[0]} {...options[0]} />
    </div>
  );
}
