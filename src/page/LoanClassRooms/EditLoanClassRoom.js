import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getClassRooms } from "../../service/ClassRoomApi/ClassRoomService";
import { getUserr } from '../../service/UsersApi/UserApi';
import { CheckAvailability, createLoanClassRoom, getLoanClassRoom } from "../../service/ClassRoomApi/LoanClassRoomService";
import { createLoan } from "../../service/ClassRoomApi/LoanService";
import { createClassroomSchedules } from "../../service/ClassRoomApi/ClassRoomScheduleService";
import { format, addDays } from 'date-fns';
function RegisterLoanClassRoom() {
    const navigate = useNavigate();
    const {id}=useParams();

    const [loanClassRoom, setLoanClassRoom] = useState({
        id_loan: "",
        id_ClassRoom: "",
        id_user:"",
        person_quantity: 0,
        requirements: "",
        request_state: ""
      
    });

    useEffect(() => {
        if (id != undefined) {
    getLoanClassRoom(id).then((data) => {              
                setLoanClassRoom(data.data);
            })
                .catch((error) => {
                    console.log(error);
                })
        }

    }, [])

    const [classRoom, setClassRoom] = useState([]);
    useEffect(() => {
        (async () => {
            const response = await getClassRooms();
            setClassRoom(response);
            console.log(response);
        })();
    }, []);
 
    const [userr, setuserr] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await getUserr(3);
            setuserr(response);
            console.log(response);
        })();
    }, []);

 

    const setLoanObject = (event) => {
        setLoan({ ...loan, [event.target.name]: event.target.value });
    }

    const [loan, setLoan] = useState({
        start_date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
        end_date: "",
        register_date: format(new Date(), 'yyyy-MM-dd')
    })

    const setObject = (event) => {
        setLoanClassRoom({ ...loanClassRoom, [event.target.name]: event.target.value });
    }

    const [classroomSchedules, setClassRoomSchedules] = useState({
        day: "",
        id_ClassRoom: "",
        start_hour: "",
       end_hour: ""
      
    })

    const [checkAvailability, setCheckAvailability] = useState({
        classroomId: 0,
        day: "",
        startHour: "",
        endHour:"",
        startDate:"",
        endDate:""
    })

    const setSchedulesObject = (event) => {
        setClassRoomSchedules({ ...classroomSchedules, [event.target.name]: event.target.value });
    }

    const setLoanAndAvailabilityValues = () => {
        loanClassRoom.id_user = userr.id;
        checkAvailability.classroomId = loanClassRoom.id_ClassRoom;
        checkAvailability.day = classroomSchedules.day;
        checkAvailability.startHour = classroomSchedules.start_hour;
        checkAvailability.endHour = classroomSchedules.end_hour;
        checkAvailability.startDate = loan.start_date;
        checkAvailability.endDate = loan.end_date;
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(classroomSchedules);
    
        setLoanAndAvailabilityValues();
        console.log(checkAvailability);
    
        try {
            const availabilityResult = await CheckAvailability(checkAvailability);
            console.log("Availability Check Result:", availabilityResult);
    
            if (availabilityResult === 0) {
               
                Swal.fire(
                    'Advertencia',
                    'El aula no está disponible en el horario seleccionado',
                    'warning'
                );
            } else if (availabilityResult === 1) {
             
    
                const createLoanResult = await createLoan(loan);
                loanClassRoom.id_loan = createLoanResult.id;
                console.log("Loan Created:", createLoanResult);
    
                const createLoanClassRoomResult = await createLoanClassRoom(loanClassRoom);
                console.log("LoanClassRoom Created:", createLoanClassRoomResult);
    
                const createClassroomSchedulesResult = await createClassroomSchedules(classroomSchedules);
                console.log("ClassroomSchedules Created:", createClassroomSchedulesResult);
    
                navigate('/');
    
                Swal.fire(
                    '¡Guardado!',
                    'Solicitud guardada con éxito',
                    'success'
                );
            }
        } catch (error) {
            console.log('Error:', error);
    
            Swal.fire(
                'Error',
                'Hubo un problema al guardar la solicitud',
                'error'
            );
        }
    };
    

    let quantityValue;

    return (
        <div className="container ">
            <form className="text-center" onSubmit={handleSubmit}>
                <div className="mx-auto" style={{ maxWidth: '600px' }}>
                    <h1>Editar solicitud de Aula/Laboratorio</h1>
                    <div className="mb-3">
                        <label className="form-label fs-5"> Usuario</label>
                        <input className="form-control text-center" name="name" value={userr.name + " " + userr.lastName} readOnly />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fs-5">Aulas/Laboratorios</label>
                        <select required
                            className="form-select text-center"
                            name="id_ClassRoom"
                            onChange={(event) => { setSchedulesObject(event);setObject(event) }}
                           
                        >
                            <option value="">Seleccione</option>
                            {classRoom.map((classR, index) => {
                                quantityValue = classR.quantity;
                                return (
                                    <option key={index} value={classR.id}>
                                        {classR.numeration}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fs-5">Dia</label>
                        <select required
                            className="form-select text-center"
                            name="day"
                            onChange={(event) => { setSchedulesObject(event) }}>
                            <option value="">Seleccione</option>
                            <option value="Lunes">Lunes</option>
                            <option value="Martes">Martes</option>
                            <option value="Miércoles">Miércoles</option>
                            <option value="Jueves">Jueves</option>
                            <option value="Viernes">Viernes</option>
                            <option value="Sábado">Sábado</option>
                        </select>
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
                                onChange={(event) => { setSchedulesObject(event) }}
                                value={classroomSchedules.start_hour}
                                className="form-control text-center"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fs-5">Hora Final </label>
                            <input
                                type="time"
                                name="end_hour"
                                min={classroomSchedules.start_hour}
                                max="21:00"
                                step="1800"
                                required
                                onChange={(event) => { setSchedulesObject(event) }}
                                value={classroomSchedules.end_hour}
                                className="form-control text-center"
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label fs-5">Fecha Inicio </label>
                            <input
                                type="date"
                                name="start_date"
                                required
                                min={format(addDays(new Date(), 2), 'yyyy-MM-dd')}
                                onChange={(event) => { setLoanObject(event) }}
                                value={loan.start_date}
                                className="form-control text-center"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fs-5">Fecha Final </label>
                            <input
                                type="date"
                                name="end_date"
                                required
                                min={loan.start_date}
                                onChange={(event) => { setLoanObject(event) }}
                                value={loan.end_date}
                                className="form-control text-center"
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fs-5">Cantidad de personas </label>
                        <input
                            type="number"
                            required
                            className="form-control text-center"
                            name="person_quantity"
                            max={quantityValue}
                            step="1"
                            onChange={(event) => { setObject(event) }}
                            value={loanClassRoom.person_quantity}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fs-5">Requerimientos </label>
                        <textarea
                            name="requirements"
                            rows="4"
                            className="form-control"
                            onChange={(event) => { setObject(event) }}
                            value={loanClassRoom.requirements}
                        />
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
export default RegisterLoanClassRoom;