import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { postSanctionsReport } from "../../service/SanctionsReport/SanctionsReportApi";

export default function AddSanctionsReport() {
    const [SanctionsReport, setSanctionsReport] = useState({
        idLibraryUser: '',
        idSanctionComputerEquipment: '',
        idReturnComputerEquipment: ''
    });

    const { idLibraryUser, idSanctionComputerEquipment, idReturnComputerEquipment } = SanctionsReport;

    const onSubmit = (event) => {
        event.preventDefault();
        postSanctionsReport(SanctionsReport);
        window.location.href = '/ListSanctionsReport';
    }

    return (
        <div>
            <h1>Agregar Reporte de Sanciones</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="row">
                    <div className="col-md-4 mb-3">
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="row">

                            <div className="col-md-12 mb-3">
                                <div className="form-group mb-3">
                                    <div class="form-floating">
                                        <input type="text" className="form-control" id="library_user" value={idLibraryUser}
                                            onChange={(event) => setSanctionsReport({ ...SanctionsReport, idLibraryUser: event.target.value })} />
                                        <label htmlFor="licensePlate">Usuario</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 mb-3">
                                <div className="form-group mb-3">
                                    <div class="form-floating">
                                        <input type="text" className="form-control" id="class" value={idSanctionComputerEquipment}
                                            onChange={(event) => setSanctionsReport({ ...SanctionsReport, idSanctionComputerEquipment: event.target.value })} />
                                        <label htmlFor="class">Sancion</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 mb-3">
                                <div className="form-group mb-3">
                                    <div class="form-floating">
                                        <input type="text" className="form-control" id="name" value={idReturnComputerEquipment}
                                            onChange={(event) => setSanctionsReport({ ...SanctionsReport, idReturnComputerEquipment: event.target.value })} />
                                        <label htmlFor="name">Boleta de Regreso</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Guardar</button>
                <Link type="button" className="btn btn-danger" to="/ListSanctionsReport">Cancelar</Link>
            </form>
        </div>
    )
}
