
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getStudyRoom } from "../../service/StudyRoom/StudyRoomService";
import { FormatterDateToForms, getTimeActually } from '../../scripts/FormatterDate';
import { createStudyRoomSchedule } from "../../service/StudyRoomSchedule/StudyRoomScheduleService";
import { decryptAES } from '../../scripts/AES-256';
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
    let hoy = FormatterDateToForms(new Date());
    const [formStudyRoomSchedule, setFormStudyRoomSchedule] = useState({
        day: hoy,
        idStudyRoom: 1,
        startHour: getTimeActually(),
        endHour: getTimeActually(),
        active: 1
    });

    const setObject = (event) => {
        setFormStudyRoomSchedule({ ...formStudyRoomSchedule, [event.target.name]: event.target.value });
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formStudyRoomSchedule.day === "" || formStudyRoomSchedule.start_hour === "" || formStudyRoomSchedule.end_hour_hour === "") {
            Swal.fire(
                'ERROR!',
                'Existen campos vacíos',
                'error'
            )
        } else {
            if (formStudyRoomSchedule.active === "") {
                formStudyRoomSchedule.active = true;

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
                'Horario de sala de estudio guardado con éxito',
                'success'
            )

        }
    }
    const handleBack = () => {
        navigate('/studyRoomsSchedule');
    }

    const resetForm = () => {
        setFormStudyRoomSchedule({
            day: hoy,
            idStudyRoom: 0,
            startHour: getTimeActually(),
            endHour: getTimeActually(),
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
                    <h1>Formulario para crear el horario de las salas de estudio</h1>
                    <div className="col-sm-6 text-start mt-2">
                        <label>Sala de estudio: </label>
                        <select required className='form-select' name="idStudyRoom" value={formStudyRoomSchedule.idStudyRoom} onChange={(event) => { setObject(event) }}>
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
                        <input required type="date" className="form-control" name="day" value={formStudyRoomSchedule.day} min={hoy} onChange={(event) => { setObject(event) }} />
                    </div>
                    <div className="col-sm-12"></div>

                    <div className="col-sm-6 text-start mt-2">
                        <label>Hora de inicio:</label>
                        <input required type="time" className="form-control" name="startHour" value={formStudyRoomSchedule.startHour} onChange={(event) => { setObject(event) }} />
                    </div>

                    <div className="col-sm-12"></div>

                    <div className="col-sm-6 text-start mt-2">
                        <label>Hora de finalización:</label>
                        <input required type="time" className="form-control" name="endHour" value={formStudyRoomSchedule.endHour} onChange={(event) => { setObject(event) }} />
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
export default FormViewStudyRoomSchedule;