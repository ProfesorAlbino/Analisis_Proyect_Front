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

    const {idLibraryUser, idSanctionComputerEquipment, idReturnComputerEquipment} = SanctionsReport;

    const onSubmit = (event) => {
        event.preventDefault();
        postSanctionsReport(SanctionsReport);
        window.location.href = '/ListSanctionsReport';
    }

    return (
        <div>
             <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group mb-3">
                    <label htmlFor="licensePlate">Usuario</label>
                    <input type="text" className="form-control" id="library_user" value={idLibraryUser} 
                    onChange={(event) => setSanctionsReport({ ...SanctionsReport, idLibraryUser: event.target.value })}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="class">Sancion</label>
                    <input type="text" className="form-control" id="class" value={idSanctionComputerEquipment} 
                    onChange={(event) => setSanctionsReport({ ...SanctionsReport, idSanctionComputerEquipment: event.target.value })}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="name">Boleta de Regreso</label>
                    <input type="text" className="form-control" id="name" value={idReturnComputerEquipment}
                    onChange={(event) => setSanctionsReport({ ...SanctionsReport, idReturnComputerEquipment: event.target.value })}/>
                </div>
              
                <button type="submit" className="btn btn-primary">Guardar</button>
                <Link type="button" className="btn btn-danger" to="/ListSanctionsReport">Cancelar</Link>
            </form>
        </div>
    )
}
