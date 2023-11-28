import React, { useState, useEffect } from 'react';
import { Button, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';

import Swal from 'sweetalert2';
import { Toaster, toast } from 'sonner';

import { getInventories, deleteInventory } from '../../service/InventoryApi/InventoryApi';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';

import { getInventoryTypeByIdInventory } from '../../service/InventoryApi/InventoryTypeApi';

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
        const result = Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Desea eliminar el inventario?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Si, ¡eliminar!',
            cancelButtonText: 'No, ¡cancelar!'
        });

        if (!result.isConfirmed) return;


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

    const getInventoryType = async (id) => {
        const res = await getInventoryTypeByIdInventory(id);
        if (res) {
            setInventory(res);
        }
    }


    const returnHome = () => {
        window.location.href = "/";
    }

    return (<>
        <Button variant="primary" onClick={returnHome}>Regresar</Button>
        <div className='container pt-5'>
            <Button variant="primary" href="/inventory/create">Crear inventario</Button>
            <Table className='border shadow'>
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
                        inventory.filter(inventory => !inventory.deleted).map((inventory, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{inventory.units}</td>
                                <td>{inventory.description}</td>
                                <td>{<Button variant="info" onClick={() => viewInventory(inventory.id)}>Ver</Button>}</td>
                                <td><Button variant="info" onClick={() => viewArea(inventory.id)}>Ver</Button></td>
                                <td>
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Editar</Tooltip>}>
                                        <Button variant="warning" onClick={() => editInventory(inventory.id)}><FaRegEdit /></Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Eliminar</Tooltip>}>
                                        <Button variant="danger" onClick={() => deleteInventoryS(inventory.id)}><FaTrashAlt /></Button>
                                    </OverlayTrigger>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table >
        </div>
    </>);
}

export default Inventory;