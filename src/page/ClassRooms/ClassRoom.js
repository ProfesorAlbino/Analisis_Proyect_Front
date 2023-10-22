import React, { useState, useEffect } from 'react';
import { deleteClassRoom, getClassRooms } from "../../service/ClassRoomService";
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function ClassRoom() {
    const [classRoom, setClassRoom] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const response = await getClassRooms();
            setClassRoom(response);
            console.log(response);
        })();
    }, []);

    async function deleteClass(id) {
        console.log("eliminar" + id);

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
                await deleteClassRoom(id).then(async (data) => {
                    const response = await getClassRooms();
                    setClassRoom(response);
                })
                    .catch((error) => {
                        console.log('error', error)
                    })
            } else {

                Swal.fire
                    (
                        'Error',
                        'No se pudo eliminar la cita.',
                        'error'
                    );
            }
        })
    }

    function editClassRoom(id) {
        console.log("id=" + id);
        navigate("/classRoom/EditClassRoom/" + id);
        console.log(id);
    }
    return (

        <div className='container pt-5'>
            <Button variant="primary" href="/classRoom/RegisterClassRoom">Crear aulas y laboratorios</Button>
            <Table >
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Detalles</th>
                        <th>cantidad</th>
                        <th>numeracion</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        classRoom.map((classRooms, index) => (
                            <tr key={classRooms.id}>
                                <td>{classRooms.type}</td>
                                <td>{classRooms.requirements}</td>
                                <td>{classRooms.quantity}</td>
                                <td>{classRooms.numeration}</td>
                                <td>
                                    <Button variant="primary" onClick={() => editClassRoom(classRooms.id)}>Editar</Button>
                                    <Button variant="danger" onClick={() => deleteClass(classRooms.id)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table >
            
        </div>
    );

}
export default ClassRoom;