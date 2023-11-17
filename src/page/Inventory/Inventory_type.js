import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';

import { deleteInventoryType, getInventoryTypesByIdInventory } from '../../service/InventoryApi/InventoryTypeApi';

function InventoryType() {
    const [inventoryType, setInventoryType] = useState([]);

    const getInventoryType = async () => {
        const res = await getInventoryTypesByIdInventory(localStorage.getItem("idInventory"));
        if (res) {
            setInventoryType(res);
        }
    }

    useEffect(() => {
        getInventoryType();
    }, []);

    function deleteInventoryTypeS(id) {
        deleteInventoryType(id);
        getInventoryType();
        window.location.reload();
    }

    function editInventoryType(id) {
        localStorage.setItem("id", id);
        window.location.href = "/inventory/inventoryType/create/";
    }

    return (<div className='container pt-5'>
        <Button variant="primary" href="/inventory/inventoryType/create">Crear tipo de inventario</Button>
        <Table className='border shadow'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    inventoryType.map((inventoryType, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{inventoryType.type}</td>
                            <td>
                                <Button variant="primary" onClick={() => editInventoryType(inventoryType.id)}>Editar</Button>
                                <Button variant="danger" onClick={() => deleteInventoryTypeS(inventoryType.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    </div>);
}

export default InventoryType;