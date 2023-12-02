import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLoanComputerEquipment } from "../../service/LoanComputerEquipment/LoanComputerEquipmentApi";
import { FormatterDate } from "../../scripts/FormatterDate";

export default function ListLoanComputerEquipment() {
    const [loanComputerEquipments, setLoanComputerEquipments] = useState([]);

    var idUser = JSON.parse(sessionStorage.getItem('user')).idLibraryUser;

    useEffect(() => {
        loadComputerEquipments();
    }, []);

    const loadComputerEquipments = async () => {
        getLoanComputerEquipment(idUser).then((result) => {
            console.log(result);
            setLoanComputerEquipments(result);
        }).catch(() => {
            console.log("Error al cargar los datos");
        });
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-12 my-4">
                    <h3 className="text-center">Préstamo de Equipo Informático</h3>
                    <div>
                        <Link className="btn btn-primary me-md-4" to={`/addLoanComputerEquipment`}>Agregar Préstamo</Link>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-1 my-4">
                </div>

                <div className="col-md-10 my-4">
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="col-md-1 my-4">
                </div>
            </div>
        </div>
    )
}