import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { createClassRoom } from "../../service/ClassRoomApi/ClassRoomService";
function RegisterClassRoom() {
    const navigate = useNavigate();
    const [classRoom, setClassRoom] = useState({
        type: "",
        description: "",
        quantity: 0,
        numeration: ""
    });
   
    const setObject = (event) => {
        setClassRoom({ ...classRoom, [event.target.name]: event.target.value });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const resp = await createClassRoom(classRoom);
            console.log('res', resp);
            navigate('/classRoom');
    
            Swal.fire(
                '¡Guardado!',
                'Cita guardada con éxito',
                'success'
            );
        } catch (error) {
            console.log('error', error);
    
            // Puedes manejar el error aquí, por ejemplo, mostrar un mensaje al usuario
            Swal.fire(
                'Error',
                'Hubo un problema al guardar la cita',
                'error'
            );
        }
    };
    
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <h1>Formulario para crear salas de estudio</h1>
                    <div className="col-sm-6 text-start">
                        <label>Tipo:</label>
                        <select required  className="form-control" name="type"  onChange={(event) => { setObject(event) }} >
                            <option value="">Seleccione un tipo</option>
                            <option value="aula">Aula</option>
                            <option value="lab informatica">Laboratorio informatica</option>
                            <option value="lab quimica">Laboratorio quimica</option>
</select>
                    </div>
                    <div className="col-sm-12"></div>

                    <div className="col-sm-6 text-start mt-2">
                        <label>Descripcion:</label>
                        <input type="text" className="form-control" name="description" value={classRoom.description} onChange={(event) => { setObject(event) }} />
                    </div>

                    <div className="col-sm-12"></div>

                    <div className="col-sm-6 text-start mt-2">
                        <label>cantidad: </label>
                        <input type="number" className="form-control" name="quantity" value={classRoom.quantity} onChange={(event) => { setObject(event) }} />

                    </div>

                    <div className="col-sm-12"></div>

                    <div className="col-sm-6 text-start mt-2">
                        <label>Numeracion: </label>
                        <input type="text" required className="form-control" name="numeration" value={classRoom.numeration} onChange={(event) => { setObject(event) }} />
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
export default RegisterClassRoom;