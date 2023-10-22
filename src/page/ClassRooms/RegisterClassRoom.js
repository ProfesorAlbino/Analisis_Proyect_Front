import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { createClassRoom } from "../../service/ClassRoomService";
function RegisterClassRoom() {
    const navigate = useNavigate();
    const [classRoom, setClassRoom] = useState({
        type: "",
        requirements: "",
        quantity: 0,
        numeration: ""
    });
   
    const setObject = (event) => {
        setClassRoom({ ...classRoom, [event.target.name]: event.target.value });
    }
    const handleSubmit = async (event ) => {
        event.preventDefault();
       
          
            await createClassRoom(classRoom).then((data) => {
                console.log('res', data.data)
                navigate('/classRoom');
            })
                .catch((error) => {
                    console.log('error', error)
                })


            Swal.fire(
                '¡Guardado!',
                'Cita guardada con éxito',
                'success'
            )

        
    }
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
                        <label>Detalles:</label>
                        <input type="text" className="form-control" name="requirements" value={classRoom.requirements} onChange={(event) => { setObject(event) }} />
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