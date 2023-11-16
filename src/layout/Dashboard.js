
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

function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <div>
      {/* //-------------------------------Navbar------------------------ */}
      <Container className="col-12">
        <Navbar className="bg-body-tertiary col-12">
          <Container>
            <Button variant="primary" onClick={toggleShow} className="me-2">
              <VscThreeBars />
            </Button>
            <Navbar.Brand href="/">SIPR</Navbar.Brand>
          </Container>
        </Navbar>
      </Container>
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
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/listTitles">Préstamo de Libros</Link>
                <button type="button" class="btn btn-outline-primary mb-2 col-12">Préstamo de Computadoras</button>
                <button type="button" class="btn btn-outline-primary mb-2 col-12">Préstamo de Salas de Estudio</button>
                <button type="button" class="btn btn-outline-primary mb-2 col-12">Préstamo de Equipo Informático</button>

              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Prestamos</Accordion.Header>
              <Accordion.Body>
                <button type="button" class="btn btn-outline-primary mb-2 col-12">Préstamo de Cancha</button>
                <button type="button" class="btn btn-outline-primary mb-2 col-12">Préstamo de Vehiculos</button>
                <button type="button" class="btn btn-outline-primary mb-2 col-12">Préstamo de Aulas y Laboratorios</button>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Administrativos</Accordion.Header>
              <Accordion.Body>
                <div class="row">
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/inventory">Administrar Inventario</Link>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/listTitles">Administrar Libros</Link>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/users">Administrar Usuarios</Link>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/ListSanctionsReport">Sanciones</Link>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/ListComputerEquipments">Equipo informatico</Link>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/studyRooms">Adiministrar Salas de estudio</Link>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/studyRoomsSchedule">Adiministrar Horario de Salas de estudio</Link>
                <Link type="button" className="btn btn-outline-primary mb-2 col-12" to="/furnitures">Adiministrar Muebles de Salas de estudio</Link>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Offcanvas.Body>
        <Offcanvas.Header>
          <footer class="footer mt-auto col-12 py-3 bg-light">
            <div class="container">
              <label class="text">SIPR</label>
              <button type="button" class="button-footer">Cerrar Sesión</button>
            </div>
          </footer>
        </Offcanvas.Header>
      </Offcanvas>
      {/* //------------------------------------------------------------ */}
    </div>
  );
}

export default function Example() {
  return (
    <div className='col-12'>
      <OffCanvasExample key={options[0]} {...options[0]} />
    </div>
  );
}
