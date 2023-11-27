
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getLoanVehicleById, updateLoanVehicle } from '../../service/LoanVehicle/LoanVehicleService';
import { getLoanById, updateLoan, updateLoans } from '../../service/LoanApi/LoanApi';


function FormViewEditLoanVehicle() {
   
    const navigate = useNavigate();
    const { id } = useParams();
    const formatDate = (date) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth()).toString().padStart(2, '0');
        const year = d.getFullYear();

        return `${year}-${month}-${day}`;
    };

    const [formLoan, setFormLoan] = useState({
        id:0,
        startDate: "",
        endDate: "",
        registerDate: ""
    });
    const [formLoanVehicle, setFormLoanVehicle] = useState({
        id:0,
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

    });
    useEffect(() => {
        (async () => {
            if (id != undefined) {
                getLoanVehicleById(id).then((data) => {

                    setFormLoanVehicle(data);
                    console.log(data)
                    getLoanById(data.idLoan).then((response) => {
                        response.startDate= formatDate(response.startDate);
                        response.endDate=formatDate(response.endDate)
                        console.log(response);
                        setFormLoan(response);
    
    
                    })

                })
            }
                    
        })();
    }, []);

    const setObject = (event) => {
        setFormLoanVehicle({ ...formLoanVehicle, [event.target.name]: event.target.value });
        setFormLoan({ ...formLoan, [event.target.name]: event.target.value });
    }

    const initialFormLoan = {
        startDate: "",
        endDate: "",
        registerDate: ""
      };
      
      const initialFormLoanVehicle = {
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
        
      };
    const handleReset = () => {
        console.log("entra");
        setFormLoan(initialFormLoan);
        setFormLoanVehicle(initialFormLoanVehicle);
      }
      const handleBack = () => {
        navigate('/loanVehicle');
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

             updateLoan(formLoan).then((data) => {
                console.log('res', data);
                formLoanVehicle.idLoan = (data.id);
                updateLoanVehicle(formLoanVehicle).then((data) => {

                    console.log('res',data)
                    navigate('/loanVehicle');
                })

            })
                .catch((error) => {
                    console.log('error', error)
                })


            Swal.fire(
                '¡Guardado!',
                'Prestámo de Vehículo editado con éxito',
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
                        <input type="number" min={1} required className="form-control" name="personQuantity" value={formLoanVehicle.personQuantity} onChange={(event) => { setObject(event) }} />
                    </div>

                    <div className="col-sm-12"></div>
                    <div className="col-sm-6 text-start">
                        <label>Fecha de partida:</label>
                        <input type="date" required className="form-control" name="startDate" value={formLoan.startDate} min={formLoan.startDate} onChange={(event) => { setObject(event) }} />
                    </div>
                    <div className="col-sm-12"></div>

                    <div className="col-sm-6 text-start mt-2">
                        <label>Hora de partida:</label>
                        <input type="time" required className="form-control" name="exitHour" value={formLoanVehicle.exitHour} onChange={(event) => { setObject(event) }} />
                    </div>

                    <div className="col-sm-12"></div>
                    <div className="col-sm-6 text-start">
                        <label>Fecha de regreso:</label>
                        <input type="date" required className="form-control" name="endDate"  min={formLoan.startDate} value={formLoan.endDate} onChange={(event) => { setObject(event) }} />
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
                        <button type="button" className="btn btn-warning" onClick={handleReset}>Limpiar</button>
                        <button type="button" className="btn btn-danger" onClick={handleBack}>Regresar</button> 
                    </div>



                </div>

            </form>
        </div>
    );
}
export default FormViewEditLoanVehicle;