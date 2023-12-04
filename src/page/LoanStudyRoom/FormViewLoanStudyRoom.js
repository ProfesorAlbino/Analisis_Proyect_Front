
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { createLoan } from '../../service/LoanApi/LoanApi';
import { FormatterDateToForms, getTimeActually } from '../../scripts/FormatterDate';
import { createLoanStudyRoom } from '../../service/LoanStudyRoom/LoanStudyRoom';
import { getStudyRoom } from '../../service/StudyRoom/StudyRoomService';
import { decryptAES } from '../../scripts/AES-256';


function FormViewEditLoanStudyRoom() {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user') && decryptAES(sessionStorage.getItem('user')));
    useEffect(() => {
        (async () => {

            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0];
            setFormLoan({ ...formLoan, registerDate: formattedDate });
        })();
    }, []);

    const [studyRooms, setStudyRooms] = useState([]);
    useEffect(() => {
        (async () => {
            console.log("ID USER: ", user.idLibraryUser);
            const response = await getStudyRoom();
            setStudyRooms(response);
            console.log(user.id);
            //console.log(response);
        })();
    }, []);

    let hoy = FormatterDateToForms(new Date());
    const [formLoan, setFormLoan] = useState({
        startDate: hoy,
        endDate: hoy,
        registerDate: "",
    });
    const [formLoanStudyRoom, setFormLoanStudyRoom] = useState({

        numberPeople: 1,
        idLoan: 1,
        idUserLibrary: user.idLibraryUser,
        studyRoom: 0,
        active: 1,
        exitHour: getTimeActually(),
        returnHour: getTimeActually(),

    });

    const setObject = (event) => {
        setFormLoanStudyRoom({ ...formLoanStudyRoom, [event.target.name]: event.target.value });
        setFormLoan({ ...formLoan, [event.target.name]: event.target.value });
    }


    const initialFormLoan = {
        startDate: hoy,
        endDate: hoy,
        registerDate: ""
    };

    const initialFormLoanStudyRoom = {
        numberPeople: 1,
        idLoan: 1,
        idUserLibrary: user.idLibraryUser,
        studyRoom: 0,
        active: 1,
        exitHour: getTimeActually(),
        returnHour: getTimeActually(),

    };
    const handleReset = () => {
        console.log("entra");
        setFormLoan(initialFormLoan);
        setFormLoanStudyRoom(initialFormLoanStudyRoom);
    }
    const handleBack = () => {
        navigate('/loanStudyRoom');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formLoanStudyRoom.numberPeople === "" || formLoanStudyRoom.idLoan === "" ||
            formLoanStudyRoom.idUserLibrary === "" || formLoanStudyRoom.studyRoom === ""
            || formLoanStudyRoom.active === "" || formLoanStudyRoom.exitHour === "" ||
            formLoanStudyRoom.returnHour === "" || formLoan.startDate === "" || formLoan.endDate === "" ||
            formLoan.registerDate === "") {
            Swal.fire(
                'ERROR!',
                'Existen campos vacíos',
                'error'
            )
        } else {

            await createLoan(formLoan).then((data) => {
                console.log('res', data);
                console.log('id', data.id);
                formLoanStudyRoom.idLoan = data.id;
                createLoanStudyRoom(formLoanStudyRoom).then((data2) => {

                    console.log('res', data2)
                    navigate('/loanStudyRoom ');
                }).catch((err) => {
                    console.log('error', err)

                })

            })
                .catch((error) => {
                    console.log('error', error)
                })


            Swal.fire(
                '¡Guardado!',
                'Prestámo de la sala de estudio guardado con éxito',
                'success'
            )

        }
    }


    return (
        <div className="container">
            <form onSubmit={handleSubmit} className='mb-5'>

                <h1>Solicitud de préstamo de sala de estudio</h1>
                <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                        <label>N° de personas:</label>
                        <input required min={1} type="number" className="form-control" name="numberPeople" value={formLoanStudyRoom.numberPeople} onChange={(event) => { setObject(event) }} />
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                        <label>Fecha de inicio:</label>
                        <input type="date" required className="form-control" name="startDate" min={hoy} value={formLoan.startDate} onChange={(event) => { setObject(event) }} />
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                        <label>Hora de inicio:</label>
                        <input type="time" required className="form-control" name="returnHour" value={formLoanStudyRoom.returnHour} onChange={(event) => { setObject(event) }} />
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                        <label>Fecha de finalización:</label>
                        <input type="date" required className="form-control" name="endDate" min={formLoan.startDate} value={formLoan.endDate} onChange={(event) => { setObject(event) }} />
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                        <label>Hora de finalización:</label>
                        <input type="time" required className="form-control" name="exitHour" value={formLoanStudyRoom.exitHour} onChange={(event) => { setObject(event) }} />
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                        <label>Sala de estudio: </label>
                        <select required className='form-select' name="studyRoom" value={formLoanStudyRoom.studyRoom} onChange={(event) => { setObject(event) }}>
                            <option value="">Selecciona una sala de estudio</option>
                            {studyRooms.filter(res => { return res.active == 1 }).map((studyRoom, index) => (
                                <option key={studyRoom.id} value={studyRoom.id}>
                                    {studyRoom.name}
                                </option>
                            ))}
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
export default FormViewEditLoanStudyRoom;