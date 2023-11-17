

//MODIFICAR
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getStudyRoom } from "../../service/StudyRoom/StudyRoomService";
import { createStudyRoomSchedule } from "../../service/StudyRoomSchedule/StudyRoomScheduleService";
function FormViewStudyRoomSchedule() {
    const navigate = useNavigate();
    const [studyRooms, setStudyRooms] = useState([]);
    useEffect(() => {
        (async () => {
            const response = await getStudyRoom();
            setStudyRooms(response);
            //console.log(response);
        })();
    }, []);
    const [formStudyRoomSchedule, setFormStudyRoomSchedule] = useState({
        day: "",
        idStudyRoom: 0,
        startHour: "",
        endHour: "",
        active: 1
    });
   
    const setObject = (event) => {
        setFormStudyRoomSchedule({ ...formStudyRoomSchedule, [event.target.name]: event.target.value });
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormStudyRoomSchedule({ ...formStudyRoomSchedule, [name]: value });
      };
    const handleSubmit = async (event ) => {
        event.preventDefault();
        if (formStudyRoomSchedule.day === "" || formStudyRoomSchedule.start_hour=== ""|| formStudyRoomSchedule.end_hour_hour=== "" ) {
            Swal.fire(
                'ERROR!',
                'Existen campos vacíos',
                'error'
            )
        } else {
            if(  formStudyRoomSchedule.active === ""){
                formStudyRoomSchedule.active=true;

            }
            await createStudyRoomSchedule(formStudyRoomSchedule).then((data) => {
                console.log('res', data.data)
                navigate('/studyRoomsSchedule');
            })
                .catch((error) => {
                    console.log('error', error)
                })


            Swal.fire(
                '¡Guardado!',
                'Horario de sala de estudio guardada con éxito',
                'success'
            )

        }
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <h1>Formulario para crear el horario de las salas de estudio</h1>
                    <div className="col-sm-6 text-start mt-2">
                        <label>Sala de estudio: </label>
                        <select className='form-select' name="idStudyRoom" value={formStudyRoomSchedule.idStudyRoom} onChange={(event) => { setObject(event) }}>
                            <option value="">Selecciona una sala de estudio</option>
                            {studyRooms.filter(res => { return res.active == 1 }).map((studyRoom, index) => (
                                <option key={studyRoom.id} value={studyRoom.id}>
                                    {studyRoom.name}
                                </option>
                            ))}
                        </select>
                        
                    </div>
                    <div className="col-sm-12"></div>
                    <div className="col-sm-6 text-start">
                        <label>Fecha:</label>
                        <input type="date" className="form-control" name="day" value={formStudyRoomSchedule.day} onChange={(event) => { setObject(event) }} />
                    </div>
                    <div className="col-sm-12"></div>

                    <div className="col-sm-6 text-start mt-2">
                        <label>Hora de inicio:</label>
                        <input type="time" className="form-control" name="startHour" value={formStudyRoomSchedule.startHour} onChange={(event) => { setObject(event) }} />
                    </div>

                    <div className="col-sm-12"></div>
                    
                    <div className="col-sm-6 text-start mt-2">
                        <label>Hora de finalización:</label>
                        <input type="time" className="form-control" name="endHour" value={formStudyRoomSchedule.endHour} onChange={(event) => { setObject(event) }} />
                    </div>

                    <div className="col-sm-12"></div>

                    <div className="col-sm-6 text-start mt-2">
                        <label>Activo: </label>
                        <input type="radio" onChange={(event) => { setFormStudyRoomSchedule({ ...formStudyRoomSchedule, "active": 1 }) }} checked={formStudyRoomSchedule.active == 1} /> Sí
                        <input type="radio" className="ml-2" onChange={(event) => { setFormStudyRoomSchedule({ ...formStudyRoomSchedule, "active": 0 }) }} checked={formStudyRoomSchedule.active == 0} /> No
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
export default FormViewStudyRoomSchedule;