
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { createFurniture } from "../../service/Furnitures/FurnituresService";
import { getStudyRoom } from "../../service/StudyRoom/StudyRoomService";

function FormViewFurniture() {
    const navigate = useNavigate();
    const [studyRooms, setStudyRooms] = useState([]);
    useEffect(() => {
        (async () => {
            const response = await getStudyRoom();
            setStudyRooms(response);
            //console.log(response);
        })();
    }, []);

    const [formFurniture, setFormFurniture] = useState({
        id_study_room: 0,
        furniture: "",
        capacity: 1,
        active: 1

    });
    const resetForm = () => {
        setFormFurniture({
            furniture: "",
            capacity: 1,
            active: 1

        });
    };

    const setObject = (event) => {
        setFormFurniture({ ...formFurniture, [event.target.name]: event.target.value });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formFurniture.furniture === "" || formFurniture.capacity === "") {
            Swal.fire(
                'ERROR!',
                'Existen campos vacíos',
                'error'
            )
        } else if (formFurniture.capacity === 0) {
            Swal.fire(
                'ERROR!',
                'Cantidad debe ser mayor a 0',
                'error'
            )
        }
        else {
            if (formFurniture.id_study_room === "" || formFurniture.active === "") {
                formFurniture.id_study_room = 1;
                formFurniture.active = true;

            }
            await createFurniture(formFurniture).then((data) => {
                console.log('res', data.data)
                navigate('/furnitures');
            })
                .catch((error) => {
                    console.log('error', error)
                })


            Swal.fire(
                '¡Guardado!',
                'Mueble guardado con éxito',
                'success'
            )

        }
    }
    const handleBack = () => {
        navigate('/furnitures');
    }

    const handleReset = () => {
        resetForm();
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <h1>Formulario para crear muebles</h1>
                    <div className="col-sm-6 text-start">
                        <label>Nombre del mueble:</label>
                        <input required type="text" className="form-control" name="furniture" value={formFurniture.furniture} onChange={(event) => { setObject(event) }} />
                    </div>
                    <div className="col-sm-12"></div>

                    <div className="col-sm-6 text-start mt-2">
                        <label>Cantidad:</label>
                        <input required type="number" min={1} className="form-control" name="capacity" value={formFurniture.capacity} onChange={(event) => { setObject(event) }} />
                    </div>

                    <div className="col-sm-12"></div>

                    <div className="col-sm-12"></div>


                    <div className="col-sm-12"></div>
                    <div className="col-sm-6 text-start mt-2">
                        <label>Sala de estudio a la que pertenece: </label>
                        <select required className='form-select' name="id_study_room" value={formFurniture.id_study_room} onChange={(event) => { setObject(event) }}>
                            <option value="">Selecciona una sala de estudio</option>
                            {studyRooms.filter(res => { return res.active == 1 }).map((studyRoom, index) => (
                                <option key={studyRoom.id} value={studyRoom.id}>
                                    {studyRoom.name}
                                </option>
                            ))}
                        </select>

                    </div>
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
export default FormViewFurniture;