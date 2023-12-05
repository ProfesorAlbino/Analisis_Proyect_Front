import React, { useState, useEffect } from 'react';
import {  getClassRooms } from "../../service/ClassRoomApi/ClassRoomService";
import { FaRegEdit, FaRegEye, FaTrashAlt } from 'react-icons/fa';
import { Button,  OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {  getLoanClassRooms, updateLoanClassRoom } from '../../service/ClassRoomApi/LoanClassRoomService';
import {  getLoans } from '../../service/ClassRoomApi/LoanService';
import { decryptAES } from '../../scripts/AES-256';


function LoanClassRoom() {
    const [classRoom, setClassRoom] = useState([]);
    const [loanClass, setLoanClass] = useState([]);
    const [loan, setLoan] = useState([]);
    const navigate = useNavigate();

    const user = JSON.parse(sessionStorage.getItem('user') && decryptAES(sessionStorage.getItem('user')));
    useEffect(() => {
        // Si el usuario no está autenticado, redirige a la página de inicio de sesión
        if (user === null) {
            Swal.fire({
                icon: "error",
                title: "Usuario no autenticado",
                text: "Por favor, inicie sesión",
            });
            navigate('/login');
        }
    }, [user]);
    



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

   



   
const deleteLoanClassRoom = async (loanClassRoom) => {
    Swal.fire({
      title: 'Confirmación de eliminación',
      text: '¿Estás seguro de que deseas eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log(loanClassRoom)
          loanClassRoom.inactive = 1
          updateLoanClassRoom(loanClassRoom)
          Swal.fire({
            title: 'Registro eliminado',
            text: 'El registro se ha eliminado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            window.location.reload();
          });
        } catch (error) {
          console.log(error)
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al eliminar el registro.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      }
    });
  };

    function editLoanClassRoom(id) {
        window.location.href = `/loanClassRooms/editLoanClassRoom/${id}`;
    }

    function viewLoanClassRoom(id){
        window.location.href = `/loanClassRooms/ViewLoanClassRoom/${id}`;

    }

    return (

        <div className='container pt-5'>
            <Button variant="primary" href="/loanClassRoom/RegisterLoanClassRoom">Solicitud aulas y laboratorios</Button>
            <Table >
                <thead>
                    <tr>
                        <th>Aula/Laboratorio</th>
                        <th>#Personas</th>
                        <th>Requerimientos</th>
                        <th>Estado</th>
                        <th colSpan={2}>Acciones</th>

                    </tr>
                </thead>
                <tbody>

                    {loanClass.map((loanClassRoom, index) => {
                        if (loanClassRoom.idUser === user.id && loanClassRoom.inactive === 0) {
                            const associatedClassRoom = classRoom.find(
                                (cr) => cr.id === loanClassRoom.idClassroom
                            );
                            const associatedLoan = loan.find(
                                (cr) => cr.id === loanClassRoom.idLoan
                            );

                            return (
                                <tr key={loanClassRoom.id}>
                                    <td>{associatedClassRoom ? associatedClassRoom.numeration : '-'}</td>
                                    <td>{loanClassRoom.personQuantity}</td>
                                    <td>{loanClassRoom.requirements}</td>
                                    <td>{loanClassRoom.requestState}</td>
                                    <td>
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Ver</Tooltip>}>
                                            <Button  id="view-button" variant="success" onClick={() => viewLoanClassRoom(loanClassRoom.id)}> <FaRegEye />                                            </Button>
                                        </OverlayTrigger>

                                        <OverlayTrigger placement="top" overlay={<Tooltip>Modificar</Tooltip>}>
                                            <Button id="edit-button" variant="primary" onClick={() => editLoanClassRoom(loanClassRoom.id)}> <FaRegEdit />                                            </Button>
                                        </OverlayTrigger>

                                        <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar</Tooltip>}>
                                            <Button id="delete-button" variant="danger" onClick={() => deleteLoanClassRoom(loanClassRoom)}><FaTrashAlt /></Button>
                                        </OverlayTrigger>


                                    </td>
                                </tr>
                            );
                        }
                    })}

                </tbody>
            </Table >

        </div>
    );

}
export default LoanClassRoom;