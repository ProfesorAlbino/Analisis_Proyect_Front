import React, { useState, useEffect } from 'react';
import { deleteClassRoom, getClassRooms } from "../../service/ClassRoomApi/ClassRoomService";
import { FaCheck, FaRegAngry, FaRegCheckCircle, FaRegCheckSquare, FaRegEdit, FaRegEye, FaRegSave, FaRegTimesCircle, FaTrashAlt,faCheck, faTimes } from 'react-icons/fa';
import { Button, Col, Form, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteLoanClassRoom, getLoanClassRooms, updateLoanClassRoom } from '../../service/ClassRoomApi/LoanClassRoomService';
import { getLoan, getLoans } from '../../service/ClassRoomApi/LoanService';
import { getUserrs } from '../../service/UsersApi/UserApi';

function AdminLoanClassRoom() {
    const [classRoom, setClassRoom] = useState([]);
    const [loanClass, setLoanClass] = useState([]);
    const [loan, setLoan] = useState([]);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await getClassRooms();
            setClassRoom(response);
        })();
    }, []);


    useEffect(() => {
        (async () => {
            const response = await getLoanClassRooms();
            setLoanClass(response);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const response = await getLoans();
            setLoan(response);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const response = await getUserrs();
            setUser(response);
        })();
    }, []);


    /*
        function deleteUser(id) {
            Swal.fire({
                title: '¿Deseas continuar?',
                text: 'Se eliminará el usuario',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                cancelButtonColor: '#dc3545',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    deleteUserr(id).then((res) => {
                        getUsers();
                        toast.success("Eliminado exitosamente");
                    }).catch((err) => {
                        console.log(err);
                        toast.error("Error al eliminar");
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
    
                }
            });
        }
    
      
    */

        const deleteLoanClassRoom = async (loanClassRoom) => {
            Swal.fire({
                title: 'Confirmación de denegacion',
                text: '¿Estás seguro de que deseas denegar esta solicitud?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, denegar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        console.log(loanClassRoom)
                        loanClassRoom.requestState="Denegado"
                        updateLoanClassRoom(loanClassRoom)
                        Swal.fire({
                            title: 'Se denego la solicitud',
                            text: 'La solicitud se ha denegado correctamente.',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        }).then(() => {
                            window.location.reload();
                        });
                    } catch (error) {
                        console.log(error)
                        Swal.fire({
                            title: 'Error',
                            text: 'Ocurrió un error al denegado el registro.',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                }
            });
        };

        const editLoanClassRoom = async (loanClassRoom) => {
            Swal.fire({
                title: 'Confirmación de aprobacion',
                text: '¿Estás seguro de que deseas aprobar esta solicitud?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí, Aprobar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        console.log(loanClassRoom)
                        loanClassRoom.requestState="Aprobado"
                        updateLoanClassRoom(loanClassRoom)
                        Swal.fire({
                            title: 'Se aprobo la solicitud',
                            text: 'La solicitud se ha aprobado correctamente.',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        }).then(() => {
                            window.location.reload();
                        });
                    } catch (error) {
                        console.log(error)
                        Swal.fire({
                            title: 'Error',
                            text: 'Ocurrió un error al aprobar el registro.',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                }
            });
        };

    function viewLoanClassRoom(id){
        window.location.href = `/loanClassRooms/ViewLoanClassRoom/${id}`;

    }
    return (

        <div className='container pt-5'>
            <Table >
                <thead>
                    <tr>
                        <th>Aula/Laboratorio</th>
                        <th>Usuario</th>
                        <th>#Personas</th>
                        <th>Requerimientos</th>
                        <th>Estado</th>
                        <th colSpan={2}>Acciones</th>

                    </tr>
                </thead>
                <tbody>

                    {loanClass.map((loanClassRoom, index) => {

                        const associatedClassRoom = classRoom.find(
                            (cr) => cr.id === loanClassRoom.idClassroom
                        );

                        const associatedLoan = loan.find(
                            (cr) => cr.id === loanClassRoom.idLoan
                        );
                        const associatedUser = user.find(
                            (cr) => cr.id === loanClassRoom.idUser
                        );


                        return (
                            <tr key={loanClassRoom.id}>
                                <td>{associatedClassRoom ? associatedClassRoom.numeration : '-'}</td>
                                <td>{associatedUser ? associatedUser.userId : '-'}</td>
                                <td>{loanClassRoom.personQuantity}</td>
                                <td>{loanClassRoom.requirements}</td>
                                <td>{loanClassRoom.requestState}</td>
                                <td>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Ver</Tooltip>}>
                                            <Button variant="success" onClick={() => viewLoanClassRoom(loanClassRoom.id)}> <FaRegEye />                                            </Button>
                                        </OverlayTrigger>

                                        <OverlayTrigger placement="top" overlay={<Tooltip>Aprobar</Tooltip>}>
                                            <Button variant="primary" onClick={() => editLoanClassRoom(loanClassRoom)}> <FaRegCheckCircle />                                            </Button>
                                        </OverlayTrigger>

                                        <OverlayTrigger placement="top" overlay={<Tooltip>Denegar</Tooltip>}>
                                            <Button variant="danger" onClick={() => deleteLoanClassRoom(loanClassRoom)}><FaRegTimesCircle /></Button>
                                        </OverlayTrigger>

                                </td>
                            </tr>
                           
                        );
                    })}
                </tbody>
            </Table >

        </div>
    );

}
export default AdminLoanClassRoom;