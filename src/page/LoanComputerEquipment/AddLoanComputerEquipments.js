import React, { useState, useEffect } from "react";
import { getComputerEquipments } from '../../service/ComputerEquipment/ComputerEquipmentApi';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsBookmarkCheckFill } from "react-icons/bs";
import { FormatterDate } from '../../scripts/FormatterDate';
import { verifyLoanComputerEquipment } from "./VerifyLoanComputerEquipment";
import Swal from 'sweetalert2'
import { decryptAES } from "../../scripts/AES-256";

export default function AddLoanComputerEquipments() {

    const [computerEquipments, setComputerEquipments] = useState([]);

    const user = JSON.parse(sessionStorage.getItem('user') && decryptAES(sessionStorage.getItem('user')));

    useEffect(() => {
        loadComputerEquipments();
    }, []);

    const loadComputerEquipments = async () => {
        getComputerEquipments().then((result) => {
            console.log(result);
            setComputerEquipments(result);
        }).catch(() => {
            console.log("Error al cargar los datos");
        });
    }

    function reservar(id) {
        localStorage.setItem("idComputerEquipment", id);
        window.location.href = "/reserveLoanComputerEquipment";
    }

    function verify(id) {
        verifyLoanComputerEquipment(id, user.idLibraryUser).then((result) => {
            if (result) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Ya reservaste este equipo",
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                reservar(id);
            }
        })
    }

    return (
        <div>

            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-center">Lista de Equipos Informaticos</h2>
                </div>

                <div className="col-md-1">
                </div>

                <div className="col-md-10">
                    <table className="table border shadow py-4">
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
                                                overlay={<Tooltip>Reservar</Tooltip>}
                                            >
                                                <button className="btn btn-primary" onClick={() => verify(computerEquipment.id)}>
                                                    <BsBookmarkCheckFill />
                                                </button>
                                            </OverlayTrigger>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="col-md-1">
                </div>

            </div>
        </div>
    )
}