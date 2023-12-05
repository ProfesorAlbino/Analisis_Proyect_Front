import React, { useState, useEffect } from 'react';
import { deleteClassRoom, getClassRooms } from "../../service/ClassRoomApi/ClassRoomService";
import { FaRegEdit, FaRegEye, FaTrashAlt } from 'react-icons/fa';
import { Button, Col, Form, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteLoanClassRoom, getLoanClassRoom, getLoanClassRooms, updateLoanClassRoom } from '../../service/ClassRoomApi/LoanClassRoomService';
import { getLoan, getLoans } from '../../service/ClassRoomApi/LoanService';
import { getUserrs } from '../../service/UsersApi/UserApi';
import { Link } from 'react-router-dom';
import { getLoanFields, updateLoanField } from '../../service/SportApi/LoanFieldApi';

function LoanClassRoom() {
    const [loan, setLoan] = useState([]);
    const [user, setUser] = useState([]);
    const [loanFieldSport,setFieldSport] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await getLoans();
            setLoan(response);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const response = await getLoanFields();
            setFieldSport(response);
            console.log(response)

        })();
    }, []);

    const deleteFieldSport = async (FieldSport) => {
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
                    console.log(FieldSport)
                    FieldSport.inactive = 1
                    updateLoanField(FieldSport)
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


    function editFieldSport(id) {
        window.location.href = `/loanSports/EditFieldSport/${id}`;
    }


    
function formatDateString(dateString) {
    if (!dateString) {
        return '-';
    }

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Meses en JavaScript son base 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}


return (
    <div className='container pt-5'>
        <Button variant="primary" href="/RegisterLoanFieldSport">Solicitud de cancha y equipo deportivo</Button>
        <Table>
    <thead>
        <tr>
            <th>Dia</th>
            <th>Hora Inicio</th>
            <th>Hora Fin</th>
            <th>Luz</th>
            <th>Cancha</th>
            <th>Equipo</th>
            <th colSpan={2}>Acciones</th>
        </tr>
    </thead>
    <tbody>
        {loanFieldSport.map((FieldSport, index) => {
            if (FieldSport.idUser === 3 && FieldSport.inactive === 0) {
                const associatedLoan = loan.find(
                    (cr) => cr.id === FieldSport.idLoan
                );

                return (
                    <tr key={FieldSport.id}>
                        <td>{formatDateString(associatedLoan ? associatedLoan.startDate : '-')}</td>
                        <td>{FieldSport.startHour}</td>
                        <td>{FieldSport.endHour}</td>
                        <td>{FieldSport.lightning ? 'on' : 'off'}</td>
                        <td>{FieldSport.field ? 'si' : 'no'}</td>
                        <td>{FieldSport.materials}</td>
                        <td>

                            <OverlayTrigger placement="top" overlay={<Tooltip>Modificar</Tooltip>}>
                                <Button variant="primary" onClick={() => editFieldSport(FieldSport.id)}> <FaRegEdit /> </Button>
                            </OverlayTrigger>

                            <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar</Tooltip>}>
                                <Button variant="danger" onClick={() => deleteFieldSport(FieldSport)}><FaTrashAlt /></Button>
                            </OverlayTrigger>
                        </td>
                    </tr>
                );
            }
        })}
    </tbody>
</Table>

    </div>
);
}
export default LoanClassRoom;