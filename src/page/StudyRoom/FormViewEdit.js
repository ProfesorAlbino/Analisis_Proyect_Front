import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getStudyRoomById, updateStudyRoom } from "../../service/StudyRoom/StudyRoomService";

function FormViewEditStudyRoom() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formStudyRoom, setFormStudyRoom] = useState({
        name: "",
        capacity: 1,
        isAvailable: 1,
        active: 1
    });

    useEffect(() => {
        if (id != undefined) {
            getStudyRoomById(id).then((data) => {

                setFormStudyRoom(data);
                console.log('data', data)

            })
                .catch((error) => {
                    console.log(error);
                })
        }

    }, [])

    const setObject = (event) => {
        setFormStudyRoom({ ...formStudyRoom, [event.target.name]: event.target.value });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formStudyRoom.name === "" || formStudyRoom.capacity === "") {
            Swal.fire(
                'ERROR!',
                'Existen campos vacíos',
                'error'
            )
        } else {
            if (formStudyRoom.isAvailable === "" || formStudyRoom.active === "") {
                formStudyRoom.isAvailable = true;
                formStudyRoom.active = true;

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
    const handleBack = () => {
        navigate('/studyRooms');
    }
    const resetForm = () => {
        setFormStudyRoom({
            name: "",
            capacity: 1,
            isAvailable: 1,
            active: 1
        });
    };

    const handleReset = () => {
        resetForm();
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <h1>Formulario para crear salas de estudio</h1>
                    <div className="col-sm-6 text-start">
                        <label>Nombre:</label>
                        <input required type="text" className="form-control" name="name" value={formStudyRoom.name} onChange={(event) => { setObject(event) }} />
                    </div>
                    <div className="col-sm-12"></div>

                    <div className="col-sm-6 text-start mt-2">
                        <label>Capacidad:</label>
                        <input required type="number" min={1} className="form-control" name="capacity" value={formStudyRoom.capacity} onChange={(event) => { setObject(event) }} />
                    </div>

                    <div className="col-sm-12"></div>

                    <div className="col-sm-6 text-start mt-2">
                        <label>Disponibilidad: </label>
                        <select className="form-select" name="active" value={formStudyRoom.isAvailable} onChange={(event) => { setFormStudyRoomSchedule({ ...formStudyRoomSchedule, "active": parseInt(event.target.value) }) }}>
                            <option value={1}>Sí</option>
                            <option value={0}>No</option>
                        </select>
                    </div>


                    <div className="col-sm-12"></div>


                    <div className="col-sm-12"></div>
                    <div className="col-sm-6 text-start mt-2">
                        <button type="submit" className="btn btn-primary mb-3">Guardar</button>
                        <button type="button" className="btn btn-warning mb-3 mx-2" onClick={handleReset}>Limpiar</button>
                        <button type="button" className="btn btn-danger mb-3" onClick={handleBack}>Regresar</button>
                    </div>
                </div>

            </form>
        </div>
    );
}
export default FormViewEditStudyRoom;
