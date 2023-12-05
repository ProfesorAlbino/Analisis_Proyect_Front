import axios from "axios";
import React, { useState, useEffect } from 'react';
import { deleteStudyRoom, getStudyRoom } from "../../service/StudyRoom/StudyRoomService";
import { Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { decryptAES } from "../../scripts/AES-256";
function StudyRoom() {
    const [studyRoom, setStudyRoom] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user') && decryptAES(sessionStorage.getItem('user')));

    useEffect(() => {
        
        if (!user || !user.idLibraryUser) {
            Swal.fire({
                title: "No puedes acceder salas de estudio",
                text: "No eres un usuario administrador",
                icon: "error",
                confirmButtonText: "Aceptar",
              });
            return;
        }else if(user.role!="Administrador"){
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
            const response = await getStudyRoom();
            setStudyRoom(response);
            console.log(response);
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
                    'La sala de estudio ha sido eliminada.',
                    'success'
                )
                await deleteStudyRoom(id).then(async (data) => {
                    window.location.reload();
                })
                    .catch((error) => {
                        console.log('error', error)
                    })
            } else {

                Swal.fire
                    (
                        'Error',
                        'No se pudo eliminar la sala de estudio.',
                        'error'
                    );
            }
        })
    }

    function editStudyRoom(id) {
       
        navigate("/studyRooms/edit/" + id);
        
    }
    return (

        <div >
            <h1>Listado de sala de estudio</h1>
            <Button className="mb-2" variant="primary" href="/studyRooms/create">Crear Sala de estudio</Button>
            <div className=" py-4 col-6 offset-3 row justify-content-center">
                <Table className="table border shadow py-4 mb-5 ">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Capacidad</th>
                            <th>Disponibilidad</th>
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                         studyRoom.length !== 0 && studyRoom.filter(res => { return res.active == 1 }).map((study, index) => (
                                <tr key={study.id}>
                                    <td>{index + 1}</td>
                                    <td>{study.name}</td>
                                    <td>{study.capacity}</td>
                                    <td>{study.isAvailable ? 'Sí' : 'No'}</td>
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
                        {studyRoom.length === 0 && (
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
export default StudyRoom;