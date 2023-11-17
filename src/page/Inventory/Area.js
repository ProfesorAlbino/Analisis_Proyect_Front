import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';

import { deleteArea, getAreasByIdInventory } from '../../service/InventoryApi/AreaApi';

function Area() {
    const [area, setArea] = useState([]);

    const getArea = async () => {
        const res = await getAreasByIdInventory(localStorage.getItem("idInventory"));
        if (res) {
            setArea(res);
        }
    }

    useEffect(() => {
        getArea();
    }, []);

    function deleteAreaS(id) {
        deleteArea(id);
        getArea();
        window.location.reload();
    }

    function editArea(id) {
        localStorage.setItem("id", id);
        window.location.href = "/inventory/area/create/";
    }

    return (<div className='container pt-5'>
        <Button variant="primary" href="/inventory/area/create">Crear area</Button>
        <Table className='border shadow'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Area</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    area.map((area, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{area.area1}</td>
                            <td>
                                <Button variant="primary" onClick={() => editArea(area.id)}>Editar</Button>
                                <Button variant="danger" onClick={() => deleteAreaS(area.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    </div>);
}

export default Area;