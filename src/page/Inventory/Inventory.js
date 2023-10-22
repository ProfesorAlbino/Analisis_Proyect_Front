import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';

import { getInventories, deleteInventory } from '../../service/InventoryApi/InventoryApi';

function Inventory() {

    const [inventory, setInventory] = useState([]);

    const getInventory = async () => {
        const res = await getInventories();
        if (res) {
            setInventory(res);
        }
    }

    useEffect(() => {
        getInventory();
    }, []);

    function deleteInventoryS(id) {
        deleteInventory(id);
        getInventory();
        window.location.reload();
    }

    function editInventory(id) {
        localStorage.setItem("id", id);
        window.location.href = "/inventory/create/";
    }

    function viewInventory(id) {
        localStorage.setItem("idInventory", id);
        window.location.href = "/inventory/inventoryType";
    }

    function viewArea(id) {
        localStorage.setItem("idInventory", id);
        window.location.href = "/inventory/area";
    }

    return (<div className='container pt-5'>
        <Button variant="primary" href="/inventory/create">Crear inventario</Button>
        <Table >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Unidades</th>
                    <th>Descripción</th>
                    <th>Tipo de inventario</th>
                    <th>Area</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    inventory.map((inventory, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{inventory.units}</td>
                            <td>{inventory.description}</td>
                            <td><Button variant="info" onClick={() => viewInventory(inventory.id)}>Ver</Button></td>
                            <td><Button variant="info" onClick={() => viewArea(inventory.id)}>Ver</Button></td>
                            <td>
                                <Button variant="primary" onClick={() => editInventory(inventory.id)}>Editar</Button>
                                <Button variant="danger" onClick={() => deleteInventoryS(inventory.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table >
    </div>);
}

export default Inventory;