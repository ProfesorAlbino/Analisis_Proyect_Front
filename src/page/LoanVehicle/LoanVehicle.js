
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteLoanVehicle, getLoanVehicle, getLoanVehicleUser } from "../../service/LoanVehicle/LoanVehicleService";
import { deleteLoan, getLoans } from '../../service/LoanApi/LoanApi';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormatterDate } from '../../scripts/FormatterDate';
import ActivityType from './components/ActivityType';
import { decryptAES } from '../../scripts/AES-256';
function LoanVehicle() {
    const [loanVehicle, setLoanVehicle] = useState([]);
    const [loans, setLoans] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user') && decryptAES(sessionStorage.getItem('user')));
    useEffect(() => {
        if (!user || !user.idLibraryUser) {
            Swal.fire({
                icon: "error",
                title: "Usuario no autenticado",
                text: "Por favor inicie sesión",
            });
            navigate("/login");
            return;
        }
        if (user.role != "Estudiante") {
            Swal.fire({
                title: "No puedes acceder a esta acción",
                text: "Debes iniciar sesión",
                showCancelButton: true,
                icon: "error",
                confirmButtonText: "Aceptar",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/login';
                }
            });
        }
        (async () => {
            console.log("ID USER: ", user.id);
            const response = await getLoanVehicleUser(user.id);

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
                    window.location.reload();

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
                            loanVehicle.length !== 0 && loanVehicle.filter(res => { return res.active == 1 }).map((loan, index) => (

                                <tr key={loan.id}>
                                    <td>{index + 1}</td>
                                    <td>{loan.unityOrCarrer}</td>
                                    <td>{loan.responsible}</td>
                                    <td>{loan.personQuantity}</td>
                                    <td>{loan.destination}</td>
                                    <td>{loan.startingPlace}</td>

                                    <td>{FormatterDate(loan.startDate)} - {FormatterDate(loan.endDate)} </td>


                                    <td>{loan.exitHour} - {loan.returnHour}</td>
                                    <td><ActivityType activity={loan.activityType} /></td>
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
                        {loanVehicle.length === 0 && (
                            <tr>
                                <td colSpan={11}>No hay datos para mostrar</td>
                            </tr>
                        )}
                    </tbody>
                </Table >
            </div>
        </div>
    );

}
export default LoanVehicle;