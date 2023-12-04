import React, { useState, useEffect } from 'react';
import { getComputerEquipments, deleteComputerEquipment } from '../../service/ComputerEquipment/ComputerEquipmentApi';
import { Link } from "react-router-dom";
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { BsBookmark } from "react-icons/bs";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormatterDate } from '../../scripts/FormatterDate';
import Swal from 'sweetalert2';

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
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminará el equipo informatico",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado!',
                    'El equipo informatico ha sido eliminado.',
                    'success'
                ).then(() => {
                    deleteComputerEquipment(id).then((result) => {
                        loadComputerEquipments();
                        console.log(result);
                    }).catch(() => {
                        console.log("Error al cargar los datos");
                    });
                })
            }
        })
    }

    function ModifyComputerEquipments(computerEquipment) {
        localStorage.setItem('computerEquipment', JSON.stringify(computerEquipment));
        window.location.href = '/ModifyComputerEquipments';
    }

    function MoreInformationComputerEquipments(computerEquipment) {
        localStorage.setItem('computerEquipment', JSON.stringify(computerEquipment));
        window.location.href = '/moreInformationComputerEquipment';
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-12 my-4">
                    <h1>Lista Equipo Informatico</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-md-2 my-4">
                </div>

                <div className="col-md-8 my-1">
                    <div className="row">
                        <div className="col-md-6 my-4">
                            <Link type="button" className="btn btn-primary" to="/AddComputerEquipments">Agregar Equipo Informatico</Link>
                        </div>
                        <div className="col-md-6 my-4">
                            <Link type="button" className="btn btn-warning" to="/">Regresar</Link>
                        </div>
                    </div>

                </div>

                <div className="col-md-2 my-4">
                </div>
            </div>

            <div className="row">
                <div className="col-md-2 my-4">
                </div>

                <div className="col-md-8 my-4">
                {computerEquipments.length === 0 ? (
                        <h3>No hay equipos informaticos</h3>
                    ) : (
                        <table className="table border shadow py-4 mb-5">
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Placa</th>
                                <th scope='col'>Nombre</th>
                                <th scope='col'>Marca</th>
                                <th scope='col'>Última Modificación</th>
                                <th scope='col'>Fecha de Entrada</th>
                                <th scope='col'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {computerEquipments.filter(computerEquipment => computerEquipment.active === true).map((computerEquipment, index) => (
                                <tr key={index}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{computerEquipment.licensePlate}</td>
                                    <td>{computerEquipment.name}</td>
                                    <td>{computerEquipment.brand}</td>
                                    <td>{FormatterDate(computerEquipment.lastModifications)}</td>
                                    <td>{FormatterDate(computerEquipment.entryDate)}</td>

                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Eliminar</Tooltip>}
                                        >
                                            <button className="btn btn-danger" onClick={() => deleteComputerEquipmentById(computerEquipment.id)}>
                                                <FaTrashAlt />
                                            </button>
                                        </OverlayTrigger>

                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Editar</Tooltip>}
                                        >
                                            <button onClick={() => ModifyComputerEquipments(computerEquipment)} className="btn btn-warning">
                                                <FaRegEdit />
                                            </button>
                                        </OverlayTrigger>

                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Ver</Tooltip>}
                                        >
                                            <button onClick={() => MoreInformationComputerEquipments(computerEquipment)} className="btn btn-primary">
                                                <BsBookmark />
                                            </button>
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    )}
                </div>
            </div>
        </div>
    )
}
