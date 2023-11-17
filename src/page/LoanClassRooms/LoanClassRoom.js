import React, { useState, useEffect } from 'react';
import { deleteClassRoom, getClassRooms } from "../../service/ClassRoomApi/ClassRoomService";
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteLoanClassRoom, getLoanClassRooms } from '../../service/ClassRoomApi/LoanClassRoomService';
import { getLoan, getLoans } from '../../service/ClassRoomApi/LoanService';
import { getUserrs } from '../../service/UsersApi/UserApi';
function ClassRoom() {
    const [classRoom, setClassRoom] = useState([]);
    const [loanClass, setLoanClass] = useState([]);
    const [loan, setLoan]= useState([]);
    const [user, setUser]=useState([]);
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




    async function deleteLoanClassR(id) {


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
                    'El reguistro ha sido eliminada.',
                    'success'
                )
                await deleteLoanClassRoom(id).then(async (data) => {
                    const response = await getLoanClassRooms();
                    setLoanClass(response);
                })
                    .catch((error) => {
                        console.log('error', error)
                    })
            } else {

                Swal.fire
                    (
                        'Error',
                        'No se pudo eliminar el reguistro.',
                        'error'
                    );
            }
        })
    }

    
    function editLoanClassR(id) {
        console.log("id=" + id);
        navigate("/LoanClassRoom/EditLoanClassRoom/" + id);
        console.log(id);
    }

    return (

        <div className='container pt-5'>
            <Button variant="primary" href="/classRoom/RegisterClassRoom">Crear aulas y laboratorios</Button>
            <Table >
                <thead>
                    <tr>
                        <th>Aula/Laboratorio</th>
                        <th>Usuario</th>
                        <th>#Personas</th>
                        <th>Requerimientos</th>
                        <th>Estado</th>
                       
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
                                    </tr>
                    );
                })}
                </tbody>
            </Table >
            
        </div>
    );

}
export default ClassRoom;