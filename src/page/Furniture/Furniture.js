
import React, { useState, useEffect } from 'react';
import { deleteFurniture, getFurniture } from "../../service/Furnitures/FurnituresService";
import { getStudyRoom, getStudyRoomById } from "../../service/StudyRoom/StudyRoomService";
import { Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { decryptAES } from '../../scripts/AES-256';
function Furniture() {
    const [furniture, setFurniture] = useState([]);
    const [studyRooms, setStudyRooms] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user') && decryptAES(sessionStorage.getItem('user')));
    useEffect(() => {
        if (!user || !user.idLibraryUser) {
            Swal.fire({
                title: "No puedes acceder a mobiliario",
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
                    'El mueble ha sido eliminado.',
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

        <div>
            <h1>Listado de mobiliario</h1>
            <Button className="mb-2" variant="primary" href="/furnitures/create">Crear mueble</Button>
            <div className=" py-4 col-6 offset-3 row justify-content-center">
                <Table className="table border shadow py-4 mb-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Pertenece a</th>
                            <th>Mueble</th>
                            <th>Capacidad</th>
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            furniture.filter(res => { return res.active == 1 }).map((f, index) => (
                                <tr key={f.id}>
                                    <td>{index + 1}</td>
                                    <td>{getStudyRoomById(f.id_study_room)}</td>
                                    <td>{f.furniture}</td>
                                    <td>{f.capacity}</td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Modificar</Tooltip>}
                                        >
                                            <button className="btn btn-warning" onClick={() => editFurniture(f.id)}>
                                                <FaRegEdit />
                                            </button>
                                        </OverlayTrigger>
                                    </td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Eliminar</Tooltip>}
                                        >
                                            <button className="btn btn-danger" onClick={() => deleteFurnitures(f.id)}>
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
export default Furniture;