import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary navbar-custom">
                <a className="navbar-brand" href="#">Sistema de Prestamos</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>    
                <Link type="button" className="btn btn-outline-light" to="/users">Usuarios</Link>
                <Link type="button" className="btn btn-outline-light" to="/inventory">Inventario</Link>
                <Link type="button" className="btn btn-outline-light" to="/studyRooms">Salas de estudio</Link>
                <Link type="button" className="btn btn-outline-light" to="/classRoom">Aula y laboratorios</Link>
            </nav>
        </div>
    )
}
