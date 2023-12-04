import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLoanVehicleById, updateLoanVehicle } from "../../service/LoanVehicle/LoanVehicleService";
import { getLoanById, updateLoan } from "../../service/LoanApi/LoanApi";
import Swal from "sweetalert2";
function FormViewEditLoanVehicleAdmin() {

    const navigate = useNavigate();
    const { id } = useParams();
    // const user = JSON.parse(sessionStorage.getItem('user') && decryptAES(sessionStorage.getItem('user')));
    const formatDate = (date) => {
        const d = new Date(date);
        const day = d.getUTCDate().toString().padStart(2, '0');
        const month = (d.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = d.getUTCFullYear();

        return `${year}-${month}-${day}`;
    };

    const [formLoan, setFormLoan] = useState({
        id: 0,
        startDate: "",
        endDate: "",
        registerDate: ""
    });
    const [formLoanVehicle, setFormLoanVehicle] = useState({
        id: 0,
        idLoan: 1,
        idUser: 1,
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
                        response.startDate = formatDate(response.startDate);
                        response.endDate = formatDate(response.endDate)
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



    const initialFormLoanVehicle = {

        assignedVehicle: "",
        active: 1

    };
    const handleReset = () => {

        setFormLoanVehicle(initialFormLoanVehicle);
    }
    const handleBack = () => {
        navigate('/loanVehicleAdmin');
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

                    console.log('res', data)
                    navigate('/loanVehicleAdmin');
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
    <form onSubmit={handleSubmit} className="mb-5">
        <h1>Solicitud de servicio de transporte</h1>
        <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                <label>Unidad o Carrera solicitante:</label>
                <input type="text" required className="form-control" name="unityOrCarrer" value={formLoanVehicle.unityOrCarrer} onChange={(event) => { setObject(event) }} />
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                <label>Responsable:</label>
                <input type="text" required className="form-control" name="responsible" value={formLoanVehicle.responsible} onChange={(event) => { setObject(event) }} />
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                <label>Lugar de destino:</label>
                <input type="text" required className="form-control" name="destination" value={formLoanVehicle.destination} onChange={(event) => { setObject(event) }} />
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                <label>Lugar de salida:</label>
                <input type="text" required className="form-control" name="startingPlace" value={formLoanVehicle.startingPlace} onChange={(event) => { setObject(event) }} />
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                <label>N° de pasajeros:</label>
                <input required min={1} type="number" className="form-control" name="personQuantity" value={formLoanVehicle.personQuantity} onChange={(event) => { setObject(event) }} />
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                <label>Fecha de partida:</label>
                <input type="date" required className="form-control" name="startDate" min={hoy} value={formLoan.startDate} onChange={(event) => { setObject(event) }} />
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                <label>Hora de partida:</label>
                <input type="time" required className="form-control" name="exitHour" value={formLoanVehicle.exitHour} onChange={(event) => { setObject(event) }} />
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                <label>Fecha de regreso:</label>
                <input type="date" required className="form-control" name="endDate" min={formLoan.startDate} value={formLoan.endDate} onChange={(event) => { setObject(event) }} />
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                <label>Hora de regreso:</label>
                <input type="time" required className="form-control" name="returnHour" value={formLoanVehicle.returnHour} onChange={(event) => { setObject(event) }} />
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                <div>
                    <label>Tipo de actividad:</label>
                </div>
                <div>
                    <input type="radio" onChange={(event) => { setFormLoanVehicle({ ...formLoanVehicle, "activityType": 1 }) }} checked={formLoanVehicle.activityType == 1} /> Investigación
                </div>
                <div>
                    <input type="radio" onChange={(event) => { setFormLoanVehicle({ ...formLoanVehicle, "activityType": 2 }) }} checked={formLoanVehicle.activityType == 2} /> Docente
                </div>
                <div>
                    <input type="radio" onChange={(event) => { setFormLoanVehicle({ ...formLoanVehicle, "activityType": 3 }) }} checked={formLoanVehicle.activityType == 3} /> Acción Social
                </div>
                <div>
                    <input type="radio" onChange={(event) => { setFormLoanVehicle({ ...formLoanVehicle, "activityType": 4 }) }} checked={formLoanVehicle.activityType == 4} /> Administrativa
                </div>
                <div>
                    <input type="radio" onChange={(event) => { setFormLoanVehicle({ ...formLoanVehicle, "activityType": 5 }) }} checked={formLoanVehicle.activityType == 5} /> Vida Estudiantil
                </div>
                <div>
                    <input type="radio" onChange={(event) => { setFormLoanVehicle({ ...formLoanVehicle, "activityType": 6 }) }} checked={formLoanVehicle.activityType == 6} /> Dirección
                </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                <label>Vehículo asignado:</label>
                <select required className="form-control" name="assignedVehicle" value={formLoanVehicle.assignedVehicle} onChange={(event) => { setObject(event) }}>
                    <option value="">Seleccione un vehículo</option>
                    <option value="Buseta">Buseta</option>
                    <option value="Automovil">Automóvil</option>
                    <option value="4X4">4X4</option>
                </select>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                <label>Estado del préstamo:</label>
                <select required className="form-control" name="state" value={formLoanVehicle.state} onChange={(event) => { setObject(event) }}>
                    <option value="">Seleccione el estado</option>
                    <option value="Aprobar">Aprobar</option>
                    <option value="Rechazar">Rechazar</option>
                    <option value="Pendiente">Pendiente</option>
                </select>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                <button type="submit" className="btn btn-primary mb-3">Guardar</button>
                <button type="button" className="btn btn-warning mb-3 mx-2" onClick={handleReset}>Limpiar</button>
                <button type="button" className="btn btn-danger mb-3" onClick={handleBack}>Regresar</button>
            </div>
        </div>
    </form>
</div>

    );
}
export default FormViewEditLoanVehicleAdmin;