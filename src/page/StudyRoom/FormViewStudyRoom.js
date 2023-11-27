import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { createStudyRoom, inserta} from "../../service/StudyRoom/StudyRoomService";
function FormViewStudyRoom() {
    const navigate = useNavigate();
    const [formStudyRoom, setFormStudyRoom] = useState({
        name: "",
        capacity: 1,
        isAvailable: 1,
        active: 1
    });
   
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
            await createStudyRoom(formStudyRoom).then((data) => {
                console.log('res', data.data)
                navigate('/studyRooms');
            })
                .catch((error) => {
                    console.log('error', error)
                })


            Swal.fire(
                '¡Guardado!',
                'Sala de estudio guardada con éxito',
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

                    

                    
                    <div className="col-sm-12"></div>
                    <div className="col-sm-6 text-start mt-2">
                        <button type="submit" className="btn btn-primary" >Guardar</button>
                        <button type="reset" className="btn btn-warning" onClick={resetForm}>Limpiar</button>
                        <button type="button" className="btn btn-danger" onClick={handleBack}>Regresar</button>
                    </div>
                    
                </div>

            </form>
        </div>
    );
}
export default FormViewStudyRoom;