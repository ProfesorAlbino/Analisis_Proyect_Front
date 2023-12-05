import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getClassRoom } from "../../service/ClassRoomApi/ClassRoomService";
import { getUserr } from '../../service/UsersApi/UserApi';
import {  getLoanClassRoom } from "../../service/ClassRoomApi/LoanClassRoomService";
import {  getLoan } from "../../service/ClassRoomApi/LoanService";
import {  getClassRoomSchedules } from "../../service/ClassRoomApi/ClassRoomScheduleService";
import { format, addDays } from 'date-fns';
import { Button, Col, Form, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';

function AdminViewLoanClassRoom() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loanClassRoom, setLoanClassRoom] = useState({});
    const [classroomSchedules, setClassRoomSchedules] = useState({});
    const [classRoom, setClassRoom] = useState([]);


    useEffect(() => {
        if (id !== undefined) {
            getLoanClassRoom(id)
                .then((data) => {
                    setLoanClassRoom(data.data);
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


    useEffect(() => {
        if (loanClassRoom && loanClassRoom.idClassroom !== undefined) {
            getClassRoom(loanClassRoom.idClassroom)
                .then((data) => {
                    setClassRoom(data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [loanClassRoom]);

    const [userr, setuserr] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await getUserr(3);
            setuserr(response);
            console.log(response);
        })();
    }, []);



    

    const [loan, setLoan] = useState({
        startDate: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
        endDate: "",
        registerDate: format(new Date(), 'yyyy-MM-dd')
    })


    return (
        <div className="container " >
            <form className="text-center" >
                <div className="mx-auto" style={{ maxWidth: '600px' }}>
                    <h1>Detalles Solicitud de Préstamo</h1>

                    <div className="mb-3">
                        <label className="form-label fs-5"> Usuario</label>
                        <input className="form-control text-center" name="name" value={userr.name + " " + userr.lastName} readOnly />
                    </div>


                    <div className="mb-3">
                        <label className="form-label fs-5"> Aulas/Laboratorios</label>
                        <input className="form-control text-center" name="Classroom" value={classRoom.numeration} readOnly />
                    </div>

                    
                    <div className="mb-3">
                        <label className="form-label fs-5">Día</label>
                        <input className="form-control text-center" name="day" value={classroomSchedules.day} readOnly />
                    </div>

                    <div className="row mb-3">

                        <div className="col-md-6">
                            <label className="form-label fs-5">Hora Inicio </label>
                            <input
                                type="time"
                                name="startHour"
                                value={classroomSchedules.startHour}
                                className="form-control text-center"
                                readOnly
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fs-5">Hora Final </label>
                            <input
                                type="time"
                                name="endHour"
                                value={classroomSchedules.endHour}
                                className="form-control text-center"
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label fs-5">Fecha Inicio </label>
                            <input
                                type="date"
                                name="startDate"
                                value={loan.startDate}
                                className="form-control text-center"
                                readOnly
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fs-5">Fecha Final </label>
                            <input
                                type="date"
                                name="endDate"
                              
                                value={loan.endDate}
                                className="form-control text-center"
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fs-5">Cantidad de personas </label>
                        <input
                            type="number"
                            className="form-control text-center"
                            name="personQuantity"
                          
                            value={loanClassRoom.personQuantity}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fs-5">Requerimientos </label>
                        <textarea
                            name="requirements"
                            rows="4"
                            className="form-control"
                         
                            value={loanClassRoom.requirements}
                            readOnly
                        />
                    </div>                
                        <Button variant="primary" href="/AdminloanClassRoom">Regresar</Button>
                    </div>
                    <div className="mb-5"></div>
                   

            </form>
        </div>
    );


}
export default AdminViewLoanClassRoom;