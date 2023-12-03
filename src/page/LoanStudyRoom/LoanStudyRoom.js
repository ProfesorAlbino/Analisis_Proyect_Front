
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import {  getLoans } from '../../service/LoanApi/LoanApi';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormatterDate } from '../../scripts/FormatterDate';
import { deleteLoanStudyRoom, getLoanStudyRoom } from '../../service/LoanStudyRoom/LoanStudyRoom';
import { getStudyRoomById } from '../../service/StudyRoom/StudyRoomService';


function LoanStudyRoom() {
    const [loanStudyRoom, setLoanStudyRoom] = useState([]);
    const [loans, setLoans] = useState([]);
   
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const response = await getLoanStudyRoom();

           
            let temporal = [];
            for (let i = 0; i < response.length; i++) {
                response[i].name = "";
            }
            for (let i = 0; i < response.length; i++) {
                let res = await getStudyRoomById(response[i].studyRoomId);

                response[i].name = res.name;
            }

            setLoanStudyRoom(response);
            const responseLoan = await getLoans();

            setLoans(responseLoan);

            console.log(responseLoan);
            console.log(response);
        })();
    }, []);
    

    async function deleteLoanSR(id) {

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
                    'El Prestámo de Sala de estudio ha sido eliminado.',
                    'success'
                )
                await deleteLoanStudyRoom(id).then(async (data) => {
                    const response = await getLoanStudyRoom();
                    setLoanStudyRoom(response);
                })
                    .catch((error) => {
                        console.log('error', error)
                    })
            } else {

                Swal.fire
                    (
                        'Error',
                        'No se pudo eliminar el Prestámo de Sala de estudio.',
                        'error'
                    );
            }
        })
    }

    function editLoanStudyRoom(id) {

        navigate("/loanStudyRoom/edit/" + id);
        

    }
    return (

        <div>
            <h1>Listado de préstamo de sala de estudio</h1>
            <Button className="mb-2" variant="primary" href="/loanStudyRoom/create">Crear Préstamo de Sala de estudio</Button>
            <div className=" py-4 col-6 offset-3 row justify-content-center">
                <Table className="table border shadow py-4 mb-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fecha de inicio</th>
                            <th>Hora de inicio</th>
                            <th>Fecha de finalización</th>
                            <th>Hora de finalización</th>
                            <th>Cantidad de personas</th>
                            <th>Sala de estudio</th>
                            
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loanStudyRoom.filter(res => { return res.active == 1 }).map((loan, index) => (

                                <tr key={loan.id}>
                                    <td>{index + 1}</td>
                                    <td>{FormatterDate(loan.startDate)}</td>
                                    <td>{loan.returnHour}</td>
                                    <td>{FormatterDate(loan.endDate)}</td>
                                    <td>{loan.exitHour}</td>
                                    <td>{loan.numberOfPeople}</td>
                                    <td>{loan.name}</td>
                                   
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Modificar</Tooltip>}
                                        >
                                            <button className="btn btn-warning" onClick={() => editLoanStudyRoom(loan.id)}>
                                                <FaRegEdit />
                                            </button>
                                        </OverlayTrigger>
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Eliminar</Tooltip>}
                                        >
                                            <button className="btn btn-danger" onClick={() => deleteLoanSR(loan.id)}>
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
export default LoanStudyRoom;