import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { format, addDays, getDay } from 'date-fns';
import { getUserr } from '../../service/UsersApi/UserApi';
import { createLoan } from "../../service/ClassRoomApi/LoanService";
import es from 'date-fns/locale/es'; // Importa el módulo de localización español
import Swal from "sweetalert2";
import { createLoanField } from '../../service/SportApi/LoanFieldApi';



function RegisterLoanFieldSport() {
    const navigate = useNavigate();

    const [userr, setuserr] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await getUserr(3);
            setuserr(response);
            console.log(response);
        })();
    }, []);

    const [loanFieldSport, setFieldSport] = useState({
        id_loan: "",
        id_user: "",
        lightning: "",
        inactive: 0,
        start_hour: "",
        end_hour: ""
    });

    const [loan, setLoan] = useState({
        start_date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
        end_date: "",
        register_date: format(new Date(), 'yyyy-MM-dd')
    });

    const setLoanField = (event) => {
        setFieldSport({ ...loanFieldSport, [event.target.name]: event.target.value });
    }



    const handleSubmit = async (event) => {
        event.preventDefault();
        loanFieldSport.id_user = userr.id;
        loan.end_date = loan.start_date;
        try {

            console.log(loanFieldSport)
            console.log(loan)


            const createLoanResult = await createLoan(loan);
            loanFieldSport.id_loan = createLoanResult.id;

            const createLoanFieldResult = await createLoanField(loanFieldSport);

            navigate('/LoanFieldSport');

            Swal.fire(
                '¡Guardado!',
                'Solicitud guardada con éxito',
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
        setFieldSport(prevState => ({
            ...prevState,
            end_hour: newEndHour
        }));

        if (newEndHour > "18:00") {
            setFieldSport(prevState => ({
                ...prevState,
                lightning: true
            }));
        } else {
            setFieldSport(prevState => ({
                ...prevState,
                lightning: false
            }));
        }
    };


    return (
        <div className="container ">
            <form className="text-center" onSubmit={handleSubmit}>
                <div className="mx-auto" style={{ maxWidth: '600px' }}>
                    <h1>Solicitud cancha y equipo deportivo</h1>
                    <div className="mb-3">
                        <label className="form-label fs-5"> Usuario</label>
                        <input className="form-control text-center" name="name" value={userr.name + " " + userr.lastName} readOnly />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fs-5">Fecha </label>
                        <input
                            type="date"
                            name="start_date"
                            required
                            min={format(addDays(new Date(), 2), 'yyyy-MM-dd')}
                            onChange={handleDateChange}
                            value={loan.start_date}
                            className="form-control text-center"
                            onInvalid={(e) => e.preventDefault()}

                        />
                    </div>



                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label fs-5">Hora Inicio </label>
                            <input
                                type="time"
                                name="start_hour"
                                min="07:00"
                                max="20:30"
                                step="1800"
                                required
                                onChange={(event) => { setLoanField(event) }}
                                value={loanFieldSport.start_hour}
                                className="form-control text-center"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fs-5">Hora Final </label>
                            <input
                                type="time"
                                name="end_hour"
                                min={loanFieldSport.start_hour}
                                max="21:00"
                                step="1800"
                                required
                                onChange={(e) => handleEndHourChange(e.target.value)} value={loanFieldSport.end_hour}
                                className="form-control text-center"
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </div>
                    <div className="mb-5"></div>
                </div>
            </form>
        </div>
    );




}
export default RegisterLoanFieldSport;