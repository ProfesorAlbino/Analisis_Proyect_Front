
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { getLoanById, getLoans, updateLoan } from '../../service/LoanApi/LoanApi';
import { FormatterDateToForms, getTimeActually } from '../../scripts/FormatterDate';
import { getLoanStudyRoom, getLoanStudyRoomById, getLoanStudyRoomByLoan, updateLoanStudyRoom } from '../../service/LoanStudyRoom/LoanStudyRoom';
import { getStudyRoom } from '../../service/StudyRoom/StudyRoomService';
import { decryptAES } from '../../scripts/AES-256';


function FormViewEditLoanStudyRoomAdmin() {
    const formatDate = (date) => {
        const d = new Date(date);
        const day = d.getUTCDate().toString().padStart(2, '0');
        const month = (d.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = d.getUTCFullYear();

        return `${year}-${month}-${day}`;
    };
    const navigate = useNavigate();
    const { id } = useParams();
    const [loanStudyRoom, setLoanStudyRoom] = useState([]);
    const user = JSON.parse(sessionStorage.getItem('user') && decryptAES(sessionStorage.getItem('user')));

    let hoy = FormatterDateToForms(new Date());
    const [formLoan, setFormLoan] = useState({
        startDate: hoy,
        endDate: hoy,
        registerDate: "",
    });
    const [formLoanStudyRoom, setFormLoanStudyRoom] = useState({
        numberOfPeople: 1,
        loanId: 1,
        idUserLibrary: user.idLibraryUser,
        studyRoomId: 0,
        active: 1,
        exitHour: getTimeActually(),
        returnHour: getTimeActually(),
        state:"Pendiente"

    });
    useEffect(() => {
        (async () => {
            const response = await getStudyRoom();

            setLoanStudyRoom(response);

            console.log(response);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (id != undefined) {
                getLoanStudyRoomById(id).then((data) => {

                    setFormLoanStudyRoom(data);
                    console.log(data)
                    getLoanById(data.loanId).then((response) => {
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
        setFormLoanStudyRoom({ ...formLoanStudyRoom, [event.target.name]: event.target.value });
        setFormLoan({ ...formLoan, [event.target.name]: event.target.value });

    }

    const initialFormLoan = {
        startDate: hoy,
        endDate: hoy,
        registerDate: ""
    };

    const initialFormLoanStudyRoom = {
        numberOfPeople: 1,
        idLoan: 1,
        idUserLibrary: user.idLibraryUser,
        studyRoomId: 0,
        active: 1,
        exitHour: getTimeActually(),
        returnHour: getTimeActually(),
        state:"Pendiente"

    };
    const handleReset = () => {

        setFormLoan(initialFormLoan);
        setFormLoanStudyRoom(initialFormLoanStudyRoom);
    }
    const handleBack = () => {
        navigate('/loanStudyRoomAdmin');
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
            console.log("llega");
            updateLoan(formLoan).then((data) => {
                console.log('res', data);
                formLoanStudyRoom.idLoan = (data.id);
                updateLoanStudyRoom(formLoanStudyRoom).then((data) => {

                    console.log('res', data)
                    navigate('/loanStudyRoomAdmin');
                })

            })
                .catch((error) => {
                    console.log('error', error)
                })


            Swal.fire(
                '¡Guardado!',
                'Prestámo de sala de estudio editado con éxito',
                'success'
            )

        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <h1>Solicitud de préstamo de sala de estudio</h1>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                        <label>N° de personas:</label>
                        <input type="number" min={1} required className="form-control" name="numberOfPeople" value={formLoanStudyRoom.numberOfPeople} onChange={(event) => { setObject(event) }} />
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                        <label>Fecha de inicio:</label>
                        <input type="date" required className="form-control" name="startDate" value={formLoan.startDate} min={formLoan.startDate} onChange={(event) => { setObject(event) }} />
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
                        <label>Salas de estudio</label>
                        <select className="form-control" name="studyRoomId" value={formLoanStudyRoom.studyRoomId} onChange={(event) => { setObject(event) }}>
                            <option value={0}>Seleccione una sala de estudio</option>
                            {loanStudyRoom.filter(res => { return res.active == 1 }).map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                <label>Estado del préstamo:</label>
                <select required className="form-control" name="state" value={formLoanStudyRoom.state} onChange={(event) => { setObject(event) }}>
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
export default FormViewEditLoanStudyRoomAdmin;