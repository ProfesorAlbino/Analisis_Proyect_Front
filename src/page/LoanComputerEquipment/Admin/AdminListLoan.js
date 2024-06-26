import React, { useState, useEffect } from "react";
import { deleteLoanComputerEquipment, getAllLoanComputerEquipment } from "../../../service/LoanComputerEquipment/LoanComputerEquipmentApi";
import { FormatterDate } from "../../../scripts/FormatterDate";
import { IoCheckmarkDone } from "react-icons/io5";
import { IoCloseCircleSharp } from "react-icons/io5";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { updateActiveLoanComputerEquipment } from "../../../service/LoanComputerEquipment/LoanComputerEquipmentApi";
import Swal from 'sweetalert2'
import { decryptAES } from "../../../scripts/AES-256";
import { Link } from "react-router-dom";

export default function AdminListLoan() {
    const [loanComputerEquipments, setLoanComputerEquipments] = useState([]);

    const user = JSON.parse(sessionStorage.getItem('user') && decryptAES(sessionStorage.getItem('user')));

    useEffect(() => {
        loadComputerEquipments();
    }, []);

    const loadComputerEquipments = async () => {
        getAllLoanComputerEquipment().then((result) => {
            console.log(result);
            setLoanComputerEquipments(result);
        }).catch(() => {
            console.log("Error al cargar los datos");
        });
    }

    function handleApproveLoan(id) {

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se aprobará el préstamo de este equipo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Si, aprobar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Aprobado!',
                    'El préstamo ha sido aprobado.',
                    'success'
                )
                updateActiveLoanComputerEquipment(id, 2).then((result) => {
                    loadComputerEquipments();
                })
            }
        })
    }

    function handleDelete(id) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminará el préstamo de este equipo",
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
                    'El préstamo ha sido eliminado.',
                    'success'
                )
                deleteLoanComputerEquipment(id).then((result) => {
                    loadComputerEquipments();
                })
            }
        })
    }

    function handleRejectLoan(id) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se rechazará el préstamo de este equipo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Si, rechazar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Rechazado!',
                    'El préstamo ha sido rechazado.',
                    'success'
                )
                updateActiveLoanComputerEquipment(id, 0).then((result) => {
                    loadComputerEquipments();
                })
            }
        })
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-12 my-2">
                    <h3 className="text-center">Lista de Préstamos de Equipo Informático</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 my-4">
                    <Link className="btn btn-warning md-1" to={`/`}>Regresar</Link>
                </div>
            </div>

            <div className="row">
                <div className="col-md-1 my-4">
                </div>

                <div className="col-md-10 my-4">
                    {loanComputerEquipments.length === 0 ? (
                        <h3>No hay datos</h3>
                    ) : (
                        <table className="table border shadow py-4 mb-5">
                            <thead>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>Activo</th>
                                    <th scope="col">Responsable</th>
                                    <th scope='col'>Evaluacion de activos</th>
                                    <th scope='col'>Lugar destino</th>
                                    <th scope='col'>Estado</th>
                                    <th scope='col'>Descripcion</th>
                                    <th scope='col'>Fecha Inicio</th>
                                    <th scope='col'>Fecha Fin</th>
                                    <th scope='col'>Condicion</th>
                                    <th scope='col'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loanComputerEquipments.map((loanComputerEquipment, index) => (
                                    <tr key={index}>
                                        <th scope='row'>{index + 1}</th>
                                        <td>{loanComputerEquipment.assets}</td>
                                        <td>{loanComputerEquipment.idLibraryUserNavigation.idUserNavigation.name}</td>
                                        <td>{loanComputerEquipment.assetEvaluation}</td>
                                        <td>{loanComputerEquipment.destinationPlace}</td>
                                        <td>{loanComputerEquipment.state}</td>
                                        <td>{loanComputerEquipment.requestActivity}</td>
                                        <td>{FormatterDate(loanComputerEquipment.idLoanNavigation.startDate)}</td>
                                        <td>{FormatterDate(loanComputerEquipment.idLoanNavigation.endDate)}</td>
                                        <td>
                                            {loanComputerEquipment.active === 1
                                                ? "Pendiente"
                                                : loanComputerEquipment.active === 0
                                                    ? "Rechazado"
                                                    : loanComputerEquipment.active === 2
                                                        ? "Aprobado"
                                                        : "Estado Desconocido"}
                                        </td>
                                        <td>
                                            <td>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip>Aprobar</Tooltip>}
                                                >
                                                    <button className="btn btn-success" onClick={() => handleApproveLoan(loanComputerEquipment.id)}>
                                                        <IoCheckmarkDone />
                                                    </button>
                                                </OverlayTrigger>
                                            </td>
                                            <td>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip>Rechazar</Tooltip>}
                                                >
                                                    <button className="btn btn-danger" onClick={() => handleRejectLoan(loanComputerEquipment.id)}>
                                                        <IoCloseCircleSharp />
                                                    </button>
                                                </OverlayTrigger>
                                            </td>
                                            <td>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip>Eliminar</Tooltip>}
                                                >
                                                    <button className="btn btn-danger" onClick={() => handleDelete(loanComputerEquipment.id)}>
                                                        <IoCloseCircleSharp />
                                                    </button>
                                                </OverlayTrigger>
                                            </td>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="col-md-1 my-4">
                </div>
            </div>
        </div>
    )
}
