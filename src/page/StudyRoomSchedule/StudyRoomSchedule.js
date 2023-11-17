//VERIFICAR
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { deleteStudyRoomSchedule, getStudyRoomSchedule, getStudyRoomScheduleById } from "../../service/StudyRoomSchedule/StudyRoomScheduleService";
import { Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getStudyRoomById } from "../../service/StudyRoom/StudyRoomService";
function StudyRoomSchedule() {
    const [studyRoomSchedule, setStudyRoomSchedule] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const response = await getStudyRoomSchedule();
        
            let temporal=[];
            for(let i=0;i<response.length;i++){
                response[i].name = "";
             }
             for(let i=0;i<response.length;i++){
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
                    'El horario de la sala de estudio ha sido eliminada.',
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

        <div className='container pt-5'>
            <Button variant="primary" href="/studyRoomsSchedule/create">Crear el horario  de la sala de estudio</Button>
            <Table >
                <thead>
                    <tr>
                        <th>Día</th>
                        <th>Sala de estudio</th>
                        <th>Hora inicio</th>
                        <th>Hora fin</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        studyRoomSchedule.filter(res => { return res.active == 1 }).map((study, index) => (
                            <tr key={study.id}>
                                <td>{study.day}</td>
                                <td>{study.name}</td>
                                <td>{study.startHour}</td>
                                <td>{study.endHour}</td>
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
export default StudyRoomSchedule;