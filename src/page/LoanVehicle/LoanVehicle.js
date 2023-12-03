
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteLoanVehicle, getLoanVehicle } from "../../service/LoanVehicle/LoanVehicleService";
import { deleteLoan, getLoans } from '../../service/LoanApi/LoanApi';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormatterDate } from '../../scripts/FormatterDate';

import ActivityType from './components/ActivityType';
function LoanVehicle() {
    const [loanVehicle, setLoanVehicle] = useState([]);
    const [loans, setLoans] = useState([]);
    const activity = "";
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const response = await getLoanVehicle();

            setLoanVehicle(response);
            const responseLoan = await getLoans();

            setLoans(responseLoan);

            console.log(responseLoan);
            console.log(response);
        })();
    }, []);

    async function deleteLoanV(id) {

        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '¡Eliminado!',
                    'El Prestámo de Vehículo ha sido eliminado.',
                    'success'
                )
                await deleteLoanVehicle(id).then(async (data) => {
                    const response = await getLoanVehicle();
                    setLoanVehicle(response);
                })
                    .catch((error) => {
                        console.log('error', error)
                    })
            } else {

                Swal.fire
                    (
                        'Error',
                        'No se pudo eliminar el Prestámo de Vehículo.',
                        'error'
                    );
            }
        })
    }

    function editLoanVehicle(id) {

        navigate("/loanVehicle/edit/" + id);

    }
    return (

        <div>
            <h1 className="text-center">Listado de préstamo de vehículo</h1>
            <Button className="mb-2" variant="primary" href="/loanVehicle/create">Crear Préstamo de Vehículo</Button>
            <div className=" py-4 col-6 offset-3 row justify-content-center">
                <Table className="table border shadow py-4 mb-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Unidad o Carrera</th>
                            <th>Responsable</th>
                            <th>Cantidad de personas</th>
                            <th>Destino</th>
                            <th>Lugar de salida</th>
                            <th>Fecha salida - regreso</th>
                            <th>Hora salida - regreso</th>
                            <th>Tipo de actividad</th>
                            <th>Estado</th>
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loanVehicle.filter(res => { return res.active == 1 }).map((loan, index) => (

                                <tr key={loan.id}>
                                    <td>{index + 1}</td>
                                    <td>{loan.unityOrCarrer}</td>
                                    <td>{loan.responsible}</td>
                                    <td>{loan.personQuantity}</td>
                                    <td>{loan.destination}</td>
                                    <td>{loan.startingPlace}</td>

                                    <td>{FormatterDate(loan.startDate)} - {FormatterDate(loan.endDate)} </td>


                                    <td>{loan.exitHour} - {loan.returnHour}</td>
                                    <td><ActivityType activity={loan.activityType}/></td>
                                    <td>{loan.state}</td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Modificar</Tooltip>}
                                        >
                                            <button className="btn btn-warning" onClick={() => editLoanVehicle(loan.id)}>
                                                <FaRegEdit />
                                            </button>
                                        </OverlayTrigger>
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Eliminar</Tooltip>}
                                        >
                                            <button className="btn btn-danger" onClick={() => deleteLoanV(loan.id)}>
                                                <FaTrashAlt />
                                            </button>
                                        </OverlayTrigger>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table >
            </div>
        </div>
    );

}
export default LoanVehicle;