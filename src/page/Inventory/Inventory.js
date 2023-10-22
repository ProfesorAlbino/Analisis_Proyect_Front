import React from "react";
import { Button, Table } from 'react-bootstrap';

function Inventory() {
    return (<div className='container pt-5'>
        <Button variant="primary" href="/users/create">Crear usuario</Button>
        <Table >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Cedula</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Categoría</th>
                    <th>Rol</th>
                    <th>Telefono</th>
                    <th>Carrera</th>
                    <th>Fecha de creación</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    
                }
            </tbody>
        </Table >
    </div>);
}

export default Inventory;