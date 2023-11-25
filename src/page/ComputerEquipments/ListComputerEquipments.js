import React, { useState, useEffect } from 'react';
import { getComputerEquipments, deleteComputerEquipment } from '../../service/ComputerEquipment/ComputerEquipmentApi';
import { Link } from "react-router-dom";
import { FaList, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormatterDate } from '../../scripts/FormatterDate';

export default function ComputerEquipments() {

    const [computerEquipments, setComputerEquipments] = useState([]);

    useEffect(() => {
        loadComputerEquipments();
    }, []);

    const loadComputerEquipments = async () => {
        getComputerEquipments().then((result) => {
            setComputerEquipments(result);
            console.log(result);
        }).catch(() => {
            console.log("Error al cargar los datos");
        });
    }

    const deleteComputerEquipmentById = async (id) => {
        deleteComputerEquipment(id).then((result) => {
            loadComputerEquipments();
            console.log(result);
        }).catch(() => {
            console.log("Error al cargar los datos");
        });
    }

    function ModifyComputerEquipments(computerEquipment) {
        localStorage.setItem('computerEquipment', JSON.stringify(computerEquipment));
        window.location.href = '/ModifyComputerEquipments';
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-12 my-4">
                    <h1>Lista Equipo Informatico</h1>
                </div>
            </div>

            <table className="table border shadow py-4 mb-5">

                
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Placa</th>
                        {/* <th scope='col'>Clase</th> */}
                        <th scope='col'>Nombre</th>
                        <th scope='col'>Marca</th>
                        {/* <th scope='col'>Modelo</th> */}
                        {/* <th scope='col'>Estado</th> */}
                        {/* <th scope='col'>Observaciones</th> */}
                        {/* <th scope='col'>Incluir</th> */}
                        <th scope='col'>Última Modificación</th>
                        {/* <th scope='col'>Número de Serie</th> */}
                        <th scope='col'>Fecha de Entrada</th>
                        <th scope='col'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {computerEquipments.filter(computerEquipment => computerEquipment.active === true).map((computerEquipment, index) => (
                        <tr key={index}>
                            <th scope='row'>{index + 1}</th>
                            <td>{computerEquipment.licensePlate}</td>
                            {/* <td>{computerEquipment.class}</td> */}
                            <td>{computerEquipment.name}</td>
                            <td>{computerEquipment.brand}</td>
                            {/* <td>{computerEquipment.model}</td> */}
                            {/* <td>{computerEquipment.state}</td> */}
                            {/* <td>{computerEquipment.observations}</td> */}
                            {/* <td>{computerEquipment.include}</td> */}
                            <td>{FormatterDate(computerEquipment.lastModifications)}</td>
                            {/* <td>{computerEquipment.serialNumber}</td> */}
                            <td>{FormatterDate(computerEquipment.entryDate)}</td>
                            <td>
                                <td>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>Eliminar</Tooltip>}
                                    >
                                        <button className="btn btn-danger" onClick={() => deleteComputerEquipmentById(computerEquipment.id)}>
                                            <FaTrashAlt />
                                        </button>
                                    </OverlayTrigger>
                                    </td>
                                    <td>

                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Editar</Tooltip>}
                                >
                                    <button onClick={() => ModifyComputerEquipments(computerEquipment)} className="btn btn-warning">
                                    <FaRegEdit />
                                    </button>
                                </OverlayTrigger>
                                </td>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link type="button" className="btn btn-primary" to="/AddComputerEquipments">Agregar Equipo Informatico</Link>
        </div>
    )
}
