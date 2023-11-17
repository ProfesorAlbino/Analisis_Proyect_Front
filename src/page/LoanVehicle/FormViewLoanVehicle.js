
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { createLoanVehicle } from '../../service/LoanVehicle/LoanVehicleService';
import { createLoan } from '../../service/LoanApi/LoanApi';


function FormViewLoanVehicle() {
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0];
            setFormLoan({ ...formLoan, registerDate: formattedDate });
        })();
    }, []);
    const [formLoan, setFormLoan] = useState({
        startDate: "",
        endDate: "",
        registerDate: ""
    });
    const [formLoanVehicle, setFormLoanVehicle] = useState({
        idLoan: 1,
        idUser: 2,
        activityType: "",
        responsible: "",
        state: "Pendiente",
        destination: "",
        startingPlace: "",
        exitHour: "",
        returnHour: "",
        personQuantity: 0,
        unityOrCarrer: "",
        assignedVehicle: "",
        active: 1
        //seguir modificando
    });

    const setObject = (event) => {
        setFormLoanVehicle({ ...formLoanVehicle, [event.target.name]: event.target.value });
        setFormLoan({ ...formLoan, [event.target.name]: event.target.value });
    }

   
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formLoanVehicle.responsible === "" || formLoanVehicle.destination === "" || formLoanVehicle.startingPlace === "" || formLoanVehicle.unityOrCarrer === "") {
            Swal.fire(
                'ERROR!',
                'Existen campos vacíos',
                'error'
            )
        } else {
            
            await createLoan(formLoan).then((data) => {
                console.log('res', data.data);
                formLoanVehicle.idLoan=parseInt(data.data.id);
                 createLoanVehicle(formLoanVehicle).then((data) => {
                
                    console.log('res', data.data)
                    navigate('/loanVehicle');
                })
               
            })
                .catch((error) => {
                    console.log('error', error)
                })


            Swal.fire(
                '¡Guardado!',
                'Prestámo de Vehículo guardada con éxito',
                'success'
            )

        }
    }


    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <h1>Solicitud de servicio de transporte</h1>
                    <div className="col-sm-6 text-start">
                        <label>Unidad o Carrera solicitante:</label>
                        <input type="text" required className="form-control" name="unityOrCarrer" value={formLoanVehicle.unityOrCarrer} onChange={(event) => { setObject(event) }} />
                    </div>
                    <div className="col-sm-12"></div>
                    <div className="col-sm-6 text-start">
                        <label>Responsable:</label>
                        <input type="text" required className="form-control" name="responsible" value={formLoanVehicle.responsible} onChange={(event) => { setObject(event) }} />
                    </div>
                    <div className="col-sm-12"></div>
                    <div className="col-sm-6 text-start mt-2">
                        <label>Lugar de destino:</label>
                        <input type="text" required className="form-control" name="destination" value={formLoanVehicle.destination} onChange={(event) => { setObject(event) }} />
                    </div>
                    <div className="col-sm-12"></div>
                    <div className="col-sm-6 text-start mt-2">
                        <label>Lugar de salida:</label>
                        <input type="text" required className="form-control" name="startingPlace" value={formLoanVehicle.startingPlace} onChange={(event) => { setObject(event) }} />
                    </div>

                    <div className="col-sm-12"></div>
                    <div className="col-sm-6 text-start mt-2">
                        <label>N° de pasajeros:</label>
                        <input type="number" required className="form-control" name="personQuantity" value={formLoanVehicle.personQuantity} onChange={(event) => { setObject(event) }} />
                    </div>

                    <div className="col-sm-12"></div>
                    <div className="col-sm-6 text-start">
                        <label>Fecha de partida:</label>
                        <input type="date" required className="form-control" name="startDate" value={formLoan.startDate} onChange={(event) => { setObject(event) }} />
                    </div>
                    <div className="col-sm-12"></div>

                    <div className="col-sm-6 text-start mt-2">
                        <label>Hora de partida:</label>
                        <input type="time" required className="form-control" name="exitHour" value={formLoanVehicle.exitHour} onChange={(event) => { setObject(event) }} />
                    </div>

                    <div className="col-sm-12"></div>
                    <div className="col-sm-6 text-start">
                        <label>Fecha de regreso:</label>
                        <input type="date" required className="form-control" name="endDate" value={formLoan.endDate} onChange={(event) => { setObject(event) }} />
                    </div>
                    <div className="col-sm-12"></div>

                    <div className="col-sm-6 text-start mt-2">
                        <label>Hora de regreso:</label>
                        <input type="time" required className="form-control" name="returnHour" value={formLoanVehicle.returnHour} onChange={(event) => { setObject(event) }} />
                    </div>
                    <div className="col-sm-12"></div>
                    <div className="col-sm-6 text-start mt-2">
                        <div> <label>Tipo de actividad: </label></div>

                        <div> <input type="radio" onChange={(event) => { setFormLoanVehicle({ ...formLoanVehicle, "activityType": 1 }) }} checked={formLoanVehicle.activityType == 1} /> Investigación
                        </div><div><input type="radio" onChange={(event) => { setFormLoanVehicle({ ...formLoanVehicle, "activityType": 2 }) }} checked={formLoanVehicle.activityType == 2} /> Docente
                        </div><div> <input type="radio" onChange={(event) => { setFormLoanVehicle({ ...formLoanVehicle, "activityType": 3 }) }} checked={formLoanVehicle.activityType == 3} /> Acción Social
                        </div><div> <input type="radio" onChange={(event) => { setFormLoanVehicle({ ...formLoanVehicle, "activityType": 4 }) }} checked={formLoanVehicle.activityType == 4} /> Administrativa
                        </div><div> <input type="radio" onChange={(event) => { setFormLoanVehicle({ ...formLoanVehicle, "activityType": 5 }) }} checked={formLoanVehicle.activityType == 5} /> Vida Estudiantil
                        </div><div> <input type="radio" onChange={(event) => { setFormLoanVehicle({ ...formLoanVehicle, "activityType": 6 }) }} checked={formLoanVehicle.activityType == 6} /> Dirección

                        </div>
                    </div>
                    <div className="col-sm-12"></div>

                    <div className="col-sm-12"></div>


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
export default FormViewLoanVehicle;