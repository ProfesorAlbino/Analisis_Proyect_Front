
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {  getFurnitureById, updateFurniture} from "../../service/Furnitures/FurnituresService";
import { getStudyRoom } from "../../service/StudyRoom/StudyRoomService";

function FormViewEditFurniture() {
    const { id } = useParams();
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
        capacity: 0,
        active: 1
    });
   
    useEffect(() => {
        if (id != undefined) {
            getFurnitureById(id).then((data) => {
                console.log('datos ', data.data);
                setFormFurniture(data.data);
            

            })
                .catch((error) => {
                    console.log(error);
                })
        }

    }, [])

    const setObject = (event) => {
        setFormFurniture({ ...formFurniture, [event.target.name]: event.target.value });
    }
    const handleSubmit = async (event ) => {
        event.preventDefault();
        if (formFurniture.furniture === "" || formFurniture.capacity === "" ) {
            Swal.fire(
                'ERROR!',
                'Existen campos vacíos',
                'error'
            )
        } else {
            if (formFurniture.id_study_room === "" || formFurniture.active === "") {
                formFurniture.id_study_room = 0;
                formFurniture.active = true;

            }
            await updateFurniture(formFurniture).then((data) => {
                console.log('res', data.data)
                navigate('/furnitures');
            })
                .catch((error) => {
                    console.log('error', error)
                })


            Swal.fire(
                '¡Guardado!',
                'Mueble editada con éxito',
                'success'
            )

        }
    }
    return (
        <div className="container">
        <form onSubmit={handleSubmit}>
            <div className="row">
                <h1>Formulario para editar muebles</h1>
                <div className="col-sm-6 text-start">
                    <label>Nombre del mueble:</label>
                    <input type="text" className="form-control" name="furniture" value={formFurniture.furniture} onChange={(event) => { setObject(event) }} />
                </div>
                <div className="col-sm-12"></div>

                <div className="col-sm-6 text-start mt-2">
                    <label>Cantidad:</label>
                    <input type="number" className="form-control" name="capacity" value={formFurniture.capacity} onChange={(event) => { setObject(event) }} />
                </div>

                <div className="col-sm-12"></div>

                <div className="col-sm-12"></div>

                <div className="col-sm-6 text-start mt-2">
                    <label>Activo: </label>
                    <input type="radio" onChange={(event) => { setFormFurniture({ ...formFurniture, "active": 1 }) }} checked={formFurniture.active == 1} /> Sí
                    <input type="radio" className="ml-2" onChange={(event) => { setFormFurniture({ ...formFurniture, "active": 0 }) }} checked={formFurniture.active == 0} /> No
                </div>
                <div className="col-sm-12"></div>
                <div className="col-sm-6 text-start mt-2">
                    <label>Sala de estudio a la que pertenece: </label>
                    <select className='form-select' name="id_study_room" value={formFurniture.id_study_room} onChange={(event) => { setObject(event) }}>
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
                    <button type="submit" className="btn btn-primary" >Guardar</button>

                </div>



            </div>

        </form>
    </div>
    );
}
export default FormViewEditFurniture;