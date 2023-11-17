import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { createStudyRoom, getStudyRoomById, updateStudyRoom} from "../../service/StudyRoom/StudyRoomService";

function FormViewEditStudyRoom() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formStudyRoom, setFormStudyRoom] = useState({
        name: "",
        capacity: 0,
        isAvailable: 1,
        active: 1
    });
   
    useEffect(() => {
        if (id != undefined) {
            getStudyRoomById(id).then((data) => {
             
                setFormStudyRoom(data.data);
            

            })
                .catch((error) => {
                    console.log(error);
                })
        }

    }, [])

    const setObject = (event) => {
        setFormStudyRoom({ ...formStudyRoom, [event.target.name]: event.target.value });
    }
    const handleSubmit = async (event ) => {
        event.preventDefault();
        if (formStudyRoom.name === "" || formStudyRoom.capacity === "" ) {
            Swal.fire(
                'ERROR!',
                'Existen campos vacíos',
                'error'
            )
        } else {
            if( formStudyRoom.isAvailable === "" || formStudyRoom.active === ""){
                formStudyRoom.isAvailable=true;
                formStudyRoom.active=true;

            }
            await updateStudyRoom(formStudyRoom).then((data) => {
                console.log('res', data.data)
                navigate('/studyRooms');
            })
                .catch((error) => {
                    console.log('error', error)
                })


            Swal.fire(
                '¡Guardado!',
                'Sala de estudio editada con éxito',
                'success'
            )

        }
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <h1>Formulario para crear salas de estudio</h1>
                    <div className="col-sm-6 text-start">
                        <label>Nombre:</label>
                        <input type="text" className="form-control" name="name" value={formStudyRoom.name} onChange={(event) => { setObject(event) }}/>
                    </div>
                    <div className="col-sm-12"></div>

                    <div className="col-sm-6 text-start mt-2">
                        <label>Capacidad:</label>
                        <input type="number" className="form-control" name="capacity" value={formStudyRoom.capacity} onChange={(event) => { setObject(event) }} />
                    </div>

                    <div className="col-sm-12"></div>

                    <div className="col-sm-6 text-start mt-2">
                        <label>Disponibilidad: </label>
                        <input type="radio" onChange={(event) => { setFormStudyRoom({ ...formStudyRoom, "isAvailable": 1 }) }} checked={formStudyRoom.isAvailable == 1} /> Sí
                        <input type="radio" className="ml-2" onChange={(event) => { setFormStudyRoom({ ...formStudyRoom, "isAvailable": 0 }) }} checked={formStudyRoom.isAvailable == 0} /> No

                    </div>

                    <div className="col-sm-12"></div>

                    <div className="col-sm-6 text-start mt-2">
                        <label>Activo: </label>
                        <input type="radio" onChange={(event) => { setFormStudyRoom({ ...formStudyRoom, "active": 1 }) }} checked={formStudyRoom.active == 1} /> Sí
                        <input type="radio" className="ml-2" onChange={(event) => { setFormStudyRoom({ ...formStudyRoom, "active": 0 }) }} checked={formStudyRoom.active == 0} /> No
                    </div>
                    <div className="col-sm-12"></div>
                    <div className="col-sm-6 text-start mt-2">
                        <button type="submit" className="btn btn-primary" >Guardar</button>
                        <button type="reset" className="btn btn-warning">Limpiar</button>
                    </div>
                </div>

            </form>
        </div>
    );
}
export default FormViewEditStudyRoom;