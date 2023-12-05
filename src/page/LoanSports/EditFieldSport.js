import React, { useState, useEffect } from 'react';
import { useNavigate ,useParams} from "react-router-dom";
import { format, addDays, getDay } from 'date-fns';
import { getUserr } from '../../service/UsersApi/UserApi';
import { createLoan, getLoan, updateLoan } from "../../service/ClassRoomApi/LoanService";
import es from 'date-fns/locale/es'; // Importa el módulo de localización español
import Swal from "sweetalert2";
import { createLoanField, getLoanField, updateLoanField } from '../../service/SportApi/LoanFieldApi';
import { Button, Col, Form, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';

function EditFieldSport() {
    const navigate = useNavigate();
    
    const [userr, setuserr] = useState([]);
    const { id } = useParams();
    const[loanFieldSport, setLoanSport]=useState([]);

    useEffect(() => {
        (async () => {
            const response = await getUserr(3);
            setuserr(response);
            console.log(response);
        })();
    }, []);

    useEffect(() => {
        if (id !== undefined) {
            getLoanField(id)
                .then((data) => {
                    setLoanSport(data.data);
                    console.log(data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);
    useEffect(() => {
        if (loanFieldSport && loanFieldSport.idLoan !== undefined) {
            getLoan(loanFieldSport.idLoan)
                .then((data) => {
                    const formattedData = {
                        ...data.data,
                        startDate: format(new Date(data.data.startDate), 'yyyy-MM-dd'),
                        endDate: format(new Date(data.data.endDate), 'yyyy-MM-dd'),
                        registerDate: format(new Date(data.data.registerDate), 'yyyy-MM-dd'),
                    };

                    setLoan(formattedData);
                    console.log('Datos del préstamo:', formattedData);
                })
                .catch((error) => {
                    console.error('Error al obtener el préstamo:', error);
                });
        }
    }, [loanFieldSport]);


 

    const setLoanField = (event) => {
        setLoanSport({ ...loanFieldSport, [event.target.name]: event.target.value });
    }
    const setLoanObject = (event) => {
        setLoan({ ...loan, [event.target.name]: event.target.value });
    }
    const [loan, setLoan] = useState({
        startDate: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
        endDate: "",
        registerDate: format(new Date(), 'yyyy-MM-dd')
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!loanFieldSport.field && !loanFieldSport.materials.trim()) {
            Swal.fire(
                'Error',
                'Los materiales son obligatorios cuando la cancha no está seleccionada.',
                'error'
            );
            return; // Detener la ejecución si la validación falla
        }
        loanFieldSport.idUser = userr.id;
        loan.endDate = loan.startDate;
        try {
            const createLoanResult = await updateLoan(loan);
            console.log(loanFieldSport)

            const createLoanFieldResult = await updateLoanField(loanFieldSport);

            navigate('/LoanFieldSport');

            Swal.fire(
                '¡Guardado!',
                'Solicitud editada con éxito',
                'success'
            );

        } catch (error) {
            console.log('Error:', error);

            Swal.fire(
                'Error',
                'Hubo un problema al guardar la solicitud',
                'error'
            );
        }
    }


    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        if (getDay(new Date(selectedDate), { locale: es }) === 6) {
            event.target.setCustomValidity('No se puede seleccionar un domingo');
        } else {
            event.target.setCustomValidity('');
        }
        setLoan({
            ...loan,
            start_date: selectedDate,
        });
    };

    const handleEndHourChange = (newEndHour) => {
        setLoanSport(prevState => ({
            ...prevState,
            endHour: newEndHour
        }));

        if (newEndHour > "18:00") {
            setLoanSport(prevState => ({
                ...prevState,
                lightning: true
            }));
        } else {
            setLoanSport(prevState => ({
                ...prevState,
                lightning: false
            }));
        }
    };


    return (
        <div className="container ">
            <form className="text-center" onSubmit={handleSubmit}>
                <div className="mx-auto" style={{ maxWidth: '600px' }}>
                    <h1>Editar Solicitud cancha y equipo deportivo</h1>
                    <div className="mb-3">
                        <label className="form-label fs-5"> Usuario</label>
                        <input className="form-control text-center" name="name" value={userr.name + " " + userr.lastName} readOnly />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fs-5">Fecha </label>
                        <input
                            type="date"
                            name="startDate"
                            required
                            min={format(addDays(new Date(), 2), 'yyyy-MM-dd')}
                            onChange={handleDateChange}
                            value={loan.startDate}
                            className="form-control text-center"
                            onInvalid={(e) => e.preventDefault()}

                        />
                    </div>



                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label fs-5">Hora Inicio </label>
                            <input
                                type="time"
                                name="startHour"
                                min="07:00"
                                max="20:30"
                                step="1800"
                                required
                                onChange={(event) => { setLoanField(event) }}
                                value={loanFieldSport.startHour}
                                className="form-control text-center"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fs-5">Hora Final </label>
                            <input
                                type="time"
                                name="endHour"
                                min={loanFieldSport.start_hour}
                                max="21:00"
                                step="1800"
                                required
                                onChange={(e) => handleEndHourChange(e.target.value)} value={loanFieldSport.endHour}
                                className="form-control text-center"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fs-5" style={{ marginRight: '10px' }}>Cancha</label>
                            <input type="checkbox"
                                name="field"
                                className="form-check-input"
                                onChange={(event) => { setLoanField(event) }}
                                checked={loanFieldSport.field}
                            />
                        </div>
                    
                        <div className="mb-3">
                        <label className="form-label fs-5">Materiales </label>
                        <textarea
                            name="materials"
                            rows="4"
                            className="form-control"
                            onChange={(event) => { setLoanField(event) }}
                            value={loanFieldSport.materials}
                        />
                    </div>
                    </div>

                    <div>
                        <button type="submit" className="btn btn-primary">Editar</button>
                    </div>
                    <div className="mb-5"></div>
                </div>
                <div>            
                        <Button variant="primary" href="/loanFieldSport">Regresar</Button>
                    </div>
                    <div className="mb-5"></div>
            </form>
        </div>
    );

}
export default EditFieldSport;