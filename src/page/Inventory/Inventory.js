import React, { useState, useEffect } from 'react';
import { Button, Col, Form, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';

import Swal from 'sweetalert2';
import { Toaster, toast } from 'sonner';

import { getInventories, deleteInventory } from '../../service/InventoryApi/InventoryApi';
import { FaList, FaRegEdit, FaTrashAlt } from 'react-icons/fa';

function Inventory() {

    const [inventory, setInventory] = useState([]);
    const [search, setSearch] = useState([]);

    const getInventory = async () => {
        const res = await getInventories();
        if (res) {
            setInventory(res);
            setSearch(res);
        }
    }

    async function searchInventory() {
        const e = document.getElementById("search").value;
        if (e !== "") {
            setInventory(inventory.filter(inventory => inventory.description.toLowerCase().includes(e.toLowerCase())));
        }
    }

    function isEmptySearch(e) {
        if (e === "") {
            setInventory(search);
        }
    }

    useEffect(() => {
        getInventory();
    }, []);

    async function deleteInventoryS(id) {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Desea eliminar el inventario?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Si, ¡eliminar!',
            cancelButtonText: 'No, ¡cancelar!'
        });

        console.log(result);
        if (!result.isConfirmed) return;


        deleteInventory(id).then((res) => {
            getInventory();
            window.location.reload();
            setTimeout(() => {
                toast.success('Inventario eliminado correctamente');
            }, 1000);
        }).catch((err) => {
            console.log(err);
        });
    }

    function editInventory(id) {
        localStorage.setItem("id", id);
        window.location.href = "/inventory/create/";
    }

    function viewArea(id) {
        localStorage.setItem("idInventory", id);
        window.location.href = "/inventory/area";
    }

    const returnHome = () => {
        window.location.href = "/";
    }

    return (<>
        <div className='container pt-5'>
            <Button variant="primary" onClick={returnHome}>Regresar</Button>
            <Form inline="true">
                <Row>
                    <Col xs="auto">
                        <Form.Control
                            type="text"
                            placeholder="Inventario"
                            className=" mr-sm-2"
                            id='search'
                            onChange={(e) => isEmptySearch(e.target.value)}
                        />
                    </Col>
                    <Col xs="auto">
                        <Button type="button" onClick={searchInventory} id='search-btn'>Buscar</Button>
                    </Col>
                </Row>
            </Form>
            <Button variant="primary" href="/inventory/create" id='btn-create'>Crear inventario</Button>
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
                                <td>{inventory.type}</td>
                                <td><Button variant="info" onClick={() => viewArea(inventory.id)}><FaList /></Button></td>
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