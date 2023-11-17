import React, { useState, useEffect } from "react";
import { getComputerEquipments } from '../../service/ComputerEquipment/ComputerEquipmentApi';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsBookmarkCheckFill } from "react-icons/bs";
import { FormatterDate } from '../../scripts/FormatterDate';

export default function AddLoanComputerEquipments() {

    const [computerEquipments, setComputerEquipments] = useState([]);

    var urlActual = window.location.href;
    var url = new URL(urlActual);
    var idUser = url.searchParams.get("idUser");
    localStorage.setItem("idUser", idUser);

    useEffect(() => {
        loadComputerEquipments();
    }, []);

    const loadComputerEquipments = async () => {
        getComputerEquipments().then((result) => {
            setComputerEquipments(result);
        }).catch(() => {
            console.log("Error al cargar los datos");
        });
    }

    function reservar(id) {
        localStorage.setItem("idComputerEquipment", id);
        window.location.href = "/reserveLoanComputerEquipment?idUser="+idUser;
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
                                                <button className="btn btn-primary" onClick={() => reservar(computerEquipment.id)}>
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