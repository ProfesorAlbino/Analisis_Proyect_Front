import { React, useState, useEffect } from "react";
import { getComputerEquipmentById } from "../../service/ComputerEquipment/ComputerEquipmentApi";
import { createLoan } from "../../service/LoanApi/LoanApi";
import { addLoanComputerEquipment } from "../../service/LoanComputerEquipment/LoanComputerEquipmentApi";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'


export default function ReserveLoanComputerEquipment() {
    let idUser = JSON.parse(sessionStorage.getItem('user')).idLibraryUser;
    let idComputerEquipment = localStorage.getItem("idComputerEquipment");

    const [loan, setLoans] = useState({
        id: 0,
        startDate: "",
        endDate: "",
        registerDate: ""
    });

    const [loanComputerEquipment, setLoanComputerEquipment] = useState({
        idLoan: 0,
        idComputerEquipment: idComputerEquipment,
        idLibraryUser: idUser,
        assets: "",
        assetEvaluation: 0,
        destinationPlace: "",
        state: "",
        dependence: "",
        requestActivity: "",
        active: 1
    });

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        setLoans({ ...loan, registerDate: formattedDate });

        getComputerEquipmentById(idComputerEquipment).then((result) => {
            setLoanComputerEquipment({
                ...loanComputerEquipment, assets: result.name, assetEvaluation: result.state,
                state: result.state, dependence: result.include, requestActivity: result.observations
            });
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se reservará el equipo informático",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {
                saveLoan();
                Swal.fire(
                    '¡Reservado!',
                    'El equipo informático ha sido reservado.',
                    'success'
                )
            }
        })
        
    };

    function saveLoan() {
        console.log(loan);
        createLoan(loan).then((response) => {
            loanComputerEquipment.idLoan = response.id;
            console.log(loanComputerEquipment);
            addLoanComputerEquipment(loanComputerEquipment).then((response) => {
            });
            console.log(loanComputerEquipment);
            window.location.href = "/ListLoanComputerEquipment";
        });
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-3">
                </div>

                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="row">

                            <div className="col-md-5 mb-2">
                                <div className="form-group">
                                    <div class="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingInput"
                                            value={loanComputerEquipment.assets}
                                            disabled
                                        />
                                        <label for="floatingInput">Activo</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-2">
                            </div>

                            <div className="col-md-5 mb-2">
                                <div className="form-group">
                                    <div class="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingInput"
                                            value={loanComputerEquipment.assetEvaluation}
                                            disabled
                                        />
                                        <label for="floatingInput">Evaluación del Activo</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-5 mb-2">
                                <div className="form-group">
                                    <div class="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingInput"
                                            value={loanComputerEquipment.state}
                                            disabled
                                        />
                                        <label for="floatingInput">Estado</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-2">
                            </div>

                            <div className="col-md-5 mb-2">
                                <div className="form-group">
                                    <div class="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingInput"
                                            value={loanComputerEquipment.dependence}
                                            disabled
                                        />
                                        <label for="floatingInput">Dependencia</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-5 mt-2 mb-2">
                                <div className="form-group">
                                    <div class="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingInput"
                                            value={loanComputerEquipment.requestActivity}
                                            disabled
                                        />
                                        <label for="floatingInput">Descripcion</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-2">
                            </div>

                            <div className="col-md-5 mb-2">
                                <div className="form-group">
                                    <div class="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingInput"
                                            onChange={(e) => setLoanComputerEquipment({ ...loanComputerEquipment, destinationPlace: e.target.value })}
                                            required
                                        />
                                        <label for="floatingInput">Lugar de destino</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-5 mb-2">
                                <div className="form-group">
                                    <div class="form-floating">
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="floatingInput"
                                            min={loan.registerDate}
                                            onChange={(e) => setLoans({ ...loan, startDate: e.target.value })}
                                            required
                                        />
                                        <label for="floatingInput">Fecha Inicio</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-2">
                            </div>

                            <div className="col-md-5 mb-2">
                                <div className="form-group">
                                    <div class="form-floating">
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="floatingInput"
                                            min={loan.startDate}
                                            onChange={(e) => setLoans({ ...loan, endDate: e.target.value })}
                                            required
                                        />
                                        <label for="floatingInput">Fecha Fin</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-5 mb-2">
                                <input type="submit" className="btn btn-primary" value="Reservar" />
                            </div>

                            <div className="col-md-2">
                            </div>

                            <div className="col-md-5 mb-2">
                                <Link type="button" className="btn btn-warning">Regresar</Link>
                             </div>

                        </div>
                    </form>
                </div>

                <div className="col-md-3">
                </div>
            </div>

        </div>
    )
}