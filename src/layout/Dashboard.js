
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Accordion from 'react-bootstrap/Accordion';
import { VscThreeBars } from "react-icons/vsc";
import { Link } from "react-router-dom";

const options = [
  {
    name: 'Enable both scrolling & backdrop',
    scroll: true,
    backdrop: true,
  },
];

localStorage.setItem("userAdmin", false);

function OffCanvas({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const onClick = () => {
    setShow(false);
  }

  return (
    <>
      {/* //-------------------------------Navbar------------------------ */}
      <div>
        <Navbar className="colorNav">
          <Container>
            <Button  variant="primary" onClick={toggleShow} className="me-2 start colorButton">
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
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to={"/listLoanBook/" + 4}>Préstamo de Libros</Link>
                <button type="button" class="btn btn-outline-primary mb-2 col-12">Préstamo de Salas de Estudio</button>
                <Link type="button" class="btn btn-outline-primary mb-2 col-12" to={`/listLoanComputerEquipment?idUser=${4}`}>Préstamo de Equipo Informático</Link>
                <Link type="button" class="btn btn-outline-primary mb-2 col-12" to="/ListComputerEquipments">Equipo Informático</Link>

              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Prestamos</Accordion.Header>
              <Accordion.Body>
                <button type="button" class="btn btn-outline-primary mb-2 col-12" >Préstamo de Cancha</button>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/loanVehicle">Préstamo de Vehiculos</Link>
                <Link type="button" class="btn btn-outline-primary mb-2 col-12" to={"/LoanClassRoom"}>Préstamo de Aulas y Laboratorios</Link>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Administrativos</Accordion.Header>
              <Accordion.Body>
                <div class="row">
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/inventory">Administrar Inventario</Link>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/listTitles">Administrar Libros</Link>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/users">Administrar Usuarios</Link>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/studyRooms">Adiministrar Salas de estudio</Link>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/studyRoomsSchedule">Adiministrar Horario de Salas de estudio</Link>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/furnitures">Adiministrar Muebles de Salas de estudio</Link>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/admLoanVehicle">Adiministrar Servicio de Transporte</Link>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/classRoom">Adiministrar De Aulas</Link>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/adminListLoan">Prestamos Equipos Informaticos</Link>

                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Sanciones</Accordion.Header>
              <Accordion.Body>
                <div class="row">
                  <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/ListSanctionsReport">Reporte de sanciones</Link>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Usuario</Accordion.Header>
              <Accordion.Body>
                <div class="row">
                  <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/users">Listado de usuarios</Link>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>Inventario</Accordion.Header>
              <Accordion.Body>
                <div class="row">
                  <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/inventory">Inventario</Link>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Offcanvas.Body>
        <Offcanvas.Header>
          <footer class="footer mt-auto col-12 py-3 bg-light">
            <div class="container">
              <label class="text">SIPR</label>
              <Link type="button" className="btn btn-outline-primary ms-4" to="/login" onClick={onClick}>Iniciar Sesión</Link>
              {/* <button type="button" class="btn btn-primary ms-2 button-footer">Iniciar Sesión</button> */}
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
