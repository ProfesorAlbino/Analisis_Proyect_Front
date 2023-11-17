
import React, { useState, useEffect } from 'react';
import { deleteFurniture, getFurniture } from "../../service/Furnitures/FurnituresService";
import { getStudyRoom, getStudyRoomById } from "../../service/StudyRoom/StudyRoomService";
import { Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
function Furniture() {
    const [furniture, setFurniture] = useState([]);
    const [studyRooms, setStudyRooms] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const response = await getFurniture();
            setFurniture(response);
            console.log(response);
            const responseStudyRooms = await getStudyRoom(); 
            setStudyRooms(responseStudyRooms);
        })();
    }, []);
    function getStudyRoomById(id) {
        const studyRoom = studyRooms.find(room => room.id === id);
        return studyRoom ? studyRoom.name : "Sala no encontrada";
    }

    async function deleteFurnitures(id) {
        console.log("eliminar" + id);
        //deleteFurniture(id);

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
                    'El mueble ha sido eliminada.',
                    'success'
                )
                await deleteFurniture(id).then(async (data) => {
                    const response = await getFurniture();
                    setFurniture(response);
                })
                    .catch((error) => {
                        console.log('error', error)
                    })
            } else {

                Swal.fire
                    (
                        'Error',
                        'No se pudo eliminar el mueble.',
                        'error'
                    );
            }
        })
    }

    function editFurniture(id) {
        console.log("id=" + id);
        navigate("/furnitures/edit/" + id);
        console.log(id);
    }
    return (

        <div className='container pt-5'>
            <Button variant="primary" href="/furnitures/create">Crear mueble</Button>
            <Table >
                <thead>
                    <tr>
                       
                        <th>Pertenece a</th>
                        <th>Mueble</th>
                        <th>Capacidad</th>


                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        furniture.filter(res => { return res.active == 1 }).map((f, index) => (
                            <tr key={f.id}>
                               
                                <td>{getStudyRoomById(f.id_study_room)}</td>
                                <td>{f.furniture}</td>
                                <td>{f.capacity}</td>

                                <td>
                                    <Button variant="primary" onClick={() => editFurniture(f.id)} style={{marginRight:'5px'}}>Editar</Button>
                                    <Button variant="danger" onClick={() => deleteFurnitures(f.id)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table >
           
        </div>
    );

}
export default Furniture;