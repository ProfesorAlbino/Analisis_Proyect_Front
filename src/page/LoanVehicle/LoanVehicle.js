
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteLoanVehicle, getLoanVehicle } from "../../service/LoanVehicle/LoanVehicleService";
import { deleteLoan, getLoans } from '../../service/LoanApi/LoanApi';

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
                    'El Prestámo de Vehículo ha sido eliminada.',
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

        <div className='container pt-5'>
            <Button variant="primary" href="/loanVehicle/create">Crear Prestámo de Vehículo</Button>
            <Table >
                <thead>
                    <tr>

                        <th>Unidad o Carrera</th>
                        <th>Responsable</th>
                        <th>Cantidad de personas</th>
                        <th>Destino</th>
                        <th>Lugar de salida</th>
                        <th>Hora de salida</th>
                        <th>Hora de regreso</th>
                        <th>Tipo de actividad</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loanVehicle.filter(res => { return res.active == 1 }).map((loan, index) => (

                            <tr key={loan.id}>
                                <td>{loan.unityOrCarrer}</td>
                                <td>{loan.responsible}</td>
                                <td>{loan.personQuantity}</td>
                                <td>{loan.destination}</td>
                                <td>{loan.startingPlace}</td>


                                <td>{loan.exitHour}</td>
                                <td>{loan.returnHour}</td>
                                <td>{loan.activityType}</td>
                                <td>{loan.state}</td>
                                <td>
                                    <Button variant="primary" onClick={() => editLoanVehicle(loan.id)} style={{ marginRight: '5px' }}>Editar</Button>
                                    <Button variant="danger" onClick={() => deleteLoanV(loan.id)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table >

        </div>
    );

}
export default LoanVehicle;