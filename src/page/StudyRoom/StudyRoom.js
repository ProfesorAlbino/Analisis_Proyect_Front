import axios from "axios";
import React, { useState, useEffect } from 'react';
import { deleteStudyRoom, getStudyRoom } from "../../service/StudyRoom/StudyRoomService";
import { Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
function StudyRoom() {
    const [studyRoom, setStudyRoom] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
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
                    const response = await getStudyRoom();
                    setStudyRoom(response);
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
        console.log("id=" + id);
        navigate("/studyRooms/edit/" + id);
        console.log(id);
    }
    return (

        <div className='container pt-5'>
            <h1>Listado de sala de estudio</h1>
            <Button className="mb-2" variant="primary" href="/studyRooms/create">Crear Sala de estudio</Button>
            <Table className="table border shadow py-4 mb-5 ">
                <thead>
                    <tr>
                        
                        <th>Nombre</th>
                        <th>Capacidad</th>
                        <th>Disponibilidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        studyRoom.filter(res => { return res.active == 1 }).map((study, index) => (
                            <tr key={study.id}>
                                
                                <td>{study.name}</td>
                                <td>{study.capacity}</td>
                                <td>{study.isAvailable ? 'Sí' : 'No'}</td>
                                <td>
                                    <Button variant="primary" onClick={() => editStudyRoom(study.id)} style={{marginRight:'5px'}}>Editar</Button>
                                    <Button variant="danger" onClick={() => deleteStudy(study.id)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table >
            
        </div>
    );

}
export default StudyRoom;