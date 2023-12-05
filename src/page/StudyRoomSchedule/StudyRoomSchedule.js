//VERIFICAR
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { deleteStudyRoomSchedule, getStudyRoomSchedule, getStudyRoomScheduleById } from "../../service/StudyRoomSchedule/StudyRoomScheduleService";
import { Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getStudyRoomById } from "../../service/StudyRoom/StudyRoomService";
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { FormatterDate } from '../../scripts/FormatterDate';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { decryptAES } from "../../scripts/AES-256";
function StudyRoomSchedule() {
    const [studyRoomSchedule, setStudyRoomSchedule] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user') && decryptAES(sessionStorage.getItem('user')));
    useEffect(() => {
         if(user.role!="Administrador"){
            Swal.fire({
                title: "No puedes realizar esta acción",
                text: "Debes iniciar sesión",
                showCancelButton: true,
                icon: "error",
                confirmButtonText: "Aceptar",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = '/login';
                  }
                  });
           
            return;
        }
        (async () => {
            const response = await getStudyRoomSchedule();

            let temporal = [];
            for (let i = 0; i < response.length; i++) {
                response[i].name = "";
            }
            for (let i = 0; i < response.length; i++) {
                let res = await getStudyRoomById(response[i].idStudyRoom);

                response[i].name = res.name;
            }

            setStudyRoomSchedule(response);

        })();
    }, []);

    async function deleteStudy(id) {
        console.log("eliminar" + id);
        //deleteStudyRoom(id);

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
                    'El horario de la sala de estudio ha sido eliminado.',
                    'success'
                )
                await deleteStudyRoomSchedule(id).then(async (data) => {
                    const response = await getStudyRoomSchedule();
                    setStudyRoomSchedule(response);
                })
                    .catch((error) => {
                        console.log('error', error)
                    })
            } else {

                Swal.fire
                    (
                        'Error',
                        'No se pudo eliminar el horario de la sala de estudio.',
                        'error'
                    );
            }
        })
    }

    function editStudyRoom(id) {

        navigate("/studyRoomsSchedule/edit/" + id);

    }
    return (

        <div >
            <h1>Listado de horario de sala de estudio</h1>
            <Button className="mb-2" variant="primary" href="/studyRoomsSchedule/create">Crear el horario  de la sala de estudio</Button>
            <div className=" py-4 col-6 offset-3 row justify-content-center">
                <Table className="table border shadow py-4 mb-5">
                    <thead>
                        <tr>
                        <th>#</th>
                            <th>Día</th>
                            <th>Sala de estudio</th>
                            <th>Hora inicio</th>
                            <th>Hora fin</th>
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            studyRoomSchedule.filter(res => { return res.active == 1 }).map((study, index) => (
                                <tr key={study.id}>
                                    <td>{index + 1}</td>
                                    <td>{FormatterDate(study.day)}</td>
                                    <td>{study.name}</td>
                                    <td>{study.startHour}</td>
                                    <td>{study.endHour}</td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Modificar</Tooltip>}
                                        >
                                            <button className="btn btn-warning" onClick={() => editStudyRoom(study.id)}>
                                                <FaRegEdit />
                                            </button>
                                        </OverlayTrigger>
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Eliminar</Tooltip>}
                                        >
                                            <button className="btn btn-danger" onClick={() => deleteStudy(study.id)}>
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
export default StudyRoomSchedule;