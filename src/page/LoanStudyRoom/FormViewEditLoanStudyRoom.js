
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { getLoanById, getLoans, updateLoan } from '../../service/LoanApi/LoanApi';
import { FormatterDateToForms, getTimeActually } from '../../scripts/FormatterDate';
import { getLoanStudyRoom, getLoanStudyRoomById, updateLoanStudyRoom } from '../../service/LoanStudyRoom/LoanStudyRoom';
import { getStudyRoom } from '../../service/StudyRoom/StudyRoomService';


function FormViewEditLoanStudyRoom() {
   
    const navigate = useNavigate();
    const { id } = useParams();
    const [loanStudyRoom, setLoanStudyRoom] = useState([]);
 
    let hoy = FormatterDateToForms(new Date());
    const [formLoan, setFormLoan] = useState({
        startDate: hoy,
        endDate: hoy,
        registerDate: "",
    });
    const [formLoanStudyRoom, setFormLoanStudyRoom] = useState({
        numberPeople:1,
        idLoan: 1,
        idUserLibrary: 2,
        studyRoom: 0,
        active: 1,
        exitHour: getTimeActually(),
        returnHour: getTimeActually(),

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
                    getLoanById(data.idLoan).then((response) => {
                        response.startDate= FormatterDateToForms(response.startDate);
                        response.endDate=FormatterDateToForms(response.endDate)
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
        numberPeople:1,
        idLoan: 1,
        idUserLibrary: 2,
        studyRoom: 0,
        active: 1,
        exitHour: getTimeActually(),
        returnHour: getTimeActually(),

    };
    const handleReset = () => {
       
        setFormLoan(initialFormLoan);
        setFormLoanStudyRoom (initialFormLoanStudyRoom );
    }
      const handleBack = () => {
        navigate('/loanVehicle');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formLoanStudyRoom .numberPeople === "" || formLoanStudyRoom .idLoan === "" || 
        formLoanStudyRoom .idUserLibrary === "" || formLoanStudyRoom .studyRoom === "" 
        || formLoanStudyRoom .active === "" || formLoanStudyRoom .exitHour === "" ||
         formLoanStudyRoom .returnHour === "" || formLoan.startDate === "" || formLoan.endDate === "" || 
         formLoan.registerDate === "") {
            Swal.fire(
                'ERROR!',
                'Existen campos vacíos',
                'error'
            )
        } else {

             updateLoan(formLoan).then((data) => {
                console.log('res', data);
                formLoanStudyRoom.idLoan = (data.id);
                updateLoanStudyRoom(formLoanStudyRoom).then((data) => {

                    console.log('res',data)
                    navigate('/loanStudyRoom');
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
            <form onSubmit={handleSubmit} className='mb-5'>
                <div className="row">
                    <h1>Solicitud de préstamo de sala de estudio</h1>
                    
                    <div className="col-sm-6 text-start mt-2">
                        <label>N° de personas:</label>
                        <input required min={1} type="number" className="form-control" name="numberPeople" value={formLoanStudyRoom .numberPeople} onChange={(event) => { setObject(event) }} />
                    </div>

                    <div className="col-sm-12"></div>
                    <div className="col-sm-6 text-start">
                        <label>Fecha de inicio:</label>
                        <input type="date" required className="form-control" name="startDate" min={hoy} value={formLoan.startDate} onChange={(event) => { setObject(event) }} />
                    </div>
                    <div className="col-sm-12"></div>

                    <div className="col-sm-6 text-start mt-2">
                        <label>Hora de inicio:</label>
                        <input type="time" required className="form-control" name="returnHour" value={formLoanStudyRoom.returnHour} onChange={(event) => { setObject(event) }} />
                    </div>

                    <div className="col-sm-12"></div>
                    <div className="col-sm-6 text-start">
                        <label>Fecha de finalización:</label>
                        <input type="date" required className="form-control" name="endDate" min={formLoan.startDate} value={formLoan.endDate} onChange={(event) => { setObject(event) }} />
                    </div>
                    <div className="col-sm-12"></div>

                    <div className="col-sm-6 text-start mt-2">
                        <label>Hora de finalización:</label>
                        <input type="time" required className="form-control" name="exitHour" value={formLoanStudyRoom.exitHour} onChange={(event) => { setObject(event) }} />
                    </div>
                    <div className="col-sm-12"></div>
                    <div className="col-sm-6 text-start mt-2">
                        <label>Sala de estudio: </label>
                        <select required className='form-select' name="studyRoom" value={formLoanStudyRoom.studyRoom} onChange={(event) => { setObject(event) }}>
                            <option value="">Selecciona una sala de estudio</option>
                            {loanStudyRoom.filter(res => { return res.active == 1 }).map((studyRoom, index) => (
                                <option key={studyRoom.id} value={studyRoom.id}>
                                    {studyRoom.name}
                                </option>
                            ))}
                        </select>
                          

                        
                    </div>

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
export default FormViewEditLoanStudyRoom;