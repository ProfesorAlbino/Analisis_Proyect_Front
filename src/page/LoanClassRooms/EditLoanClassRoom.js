import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getClassRooms } from "../../service/ClassRoomApi/ClassRoomService";
import { getUserr } from '../../service/UsersApi/UserApi';
import { CheckAvailabilityUpdate, getLoanClassRoom, updateLoanClassRoom } from "../../service/ClassRoomApi/LoanClassRoomService";
import { updateLoan, getLoan } from "../../service/ClassRoomApi/LoanService";
import { updateClassroomSchedules, getClassRoomSchedules } from "../../service/ClassRoomApi/ClassRoomScheduleService";
import { format, addDays } from 'date-fns';
function EditLoanClassRoom() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loanClassRoom, setLoanClassRoom] = useState({});
    const [classroomSchedules, setClassRoomSchedules] = useState({});

    useEffect(() => {
        if (id !== undefined) {
            getLoanClassRoom(id)
                .then((data) => {
                    setLoanClassRoom(data.data);
                    console.log(data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    useEffect(() => {
        if (loanClassRoom && loanClassRoom.idSchedule !== undefined) {
            getClassRoomSchedules(loanClassRoom.idSchedule)
                .then((data) => {
                    setClassRoomSchedules(data.data);
                    console.log(data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [loanClassRoom]);
    useEffect(() => {
        if (loanClassRoom && loanClassRoom.idLoan !== undefined) {
            getLoan(loanClassRoom.idLoan)
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
    }, [loanClassRoom]);


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
        startDate: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
        endDate: "",
        registerDate: format(new Date(), 'yyyy-MM-dd')
    })

    const setObject = (event) => {
        setLoanClassRoom({ ...loanClassRoom, [event.target.name]: event.target.value });
    }


    const [checkAvailability, setCheckAvailability] = useState({
        classroomId: 0,
        day: "",
        startHour: "",
        endHour: "",
        startDate: "",
        endDate: ""
    })

    const setSchedulesObject = (event) => {
        setClassRoomSchedules({ ...classroomSchedules, [event.target.name]: event.target.value });
    }

    const setLoanAndAvailabilityValues = () => {
        loanClassRoom.id_user = userr.id;
        loanClassRoom.inactive=0;
        checkAvailability.classroomId = loanClassRoom.idClassroom;
        checkAvailability.day = classroomSchedules.day;
        checkAvailability.startHour = classroomSchedules.startHour;
        checkAvailability.endHour = classroomSchedules.endHour;
        checkAvailability.startDate = loan.startDate;
        checkAvailability.endDate = loan.endDate;

    };
    console.log(checkAvailability);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoanAndAvailabilityValues();

        try {
            const availabilityResult = await CheckAvailabilityUpdate(checkAvailability);
            console.log("Availability Check Result:", availabilityResult);
            console.log("Loan Created:", loan);

            if (availabilityResult === false) {
                console.log("Loan Created:", loan);

                Swal.fire(
                    'Advertencia',
                    'El aula no está disponible en el horario seleccionado',
                    'warning'
                );
            } else if (availabilityResult === true) {

                const createLoanResult = await updateLoan(loan);
                loanClassRoom.id_loan = createLoanResult.id;

                const createLoanClassRoomResult = await updateLoanClassRoom(loanClassRoom);
                console.log("LoanClassRoom Created:", createLoanClassRoomResult);

                const createClassroomSchedulesResult = await updateClassroomSchedules(classroomSchedules);
                console.log("ClassroomSchedules Created:", createClassroomSchedulesResult);

                navigate('/LoanClassRoom');

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
                            name="idClassroom"
                            onChange={(event) => { setSchedulesObject(event); setObject(event) }}
                            value={loanClassRoom.idClassroom}
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
                            onChange={(event) => { setSchedulesObject(event) }}
                            value={classroomSchedules.day}>
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
                                name="startHour"
                                min="07:00"
                                max="20:30"
                                step="1800"
                                required
                                onChange={(event) => { setSchedulesObject(event) }}
                                value={classroomSchedules.startHour}
                                className="form-control text-center"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fs-5">Hora Final </label>
                            <input
                                type="time"
                                name="endHour"
                                min={classroomSchedules.start_hour}
                                max="21:00"
                                step="1800"
                                required
                                onChange={(event) => { setSchedulesObject(event) }}
                                value={classroomSchedules.endHour}
                                className="form-control text-center"
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label fs-5">Fecha Inicio </label>
                            <input
                                type="date"
                                name="startDate"
                                required
                                min={format(addDays(new Date(), 2), 'yyyy-MM-dd')}
                                onChange={(event) => { setLoanObject(event) }}
                                value={loan.startDate}
                                className="form-control text-center"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fs-5">Fecha Final </label>
                            <input
                                type="date"
                                name="endDate"
                                required
                                min={loan.startDate}
                                onChange={(event) => { setLoanObject(event) }}
                                value={loan.endDate}
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
                            name="personQuantity"
                            max={quantityValue}
                            step="1"
                            min="0"
                            onChange={(event) => { setObject(event) }}
                            value={loanClassRoom.personQuantity}
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
export default EditLoanClassRoom;