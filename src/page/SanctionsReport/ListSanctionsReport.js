import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSanctionsReports, deleteSanctionsReport } from "../../service/SanctionsReport/SanctionsReportApi";
import { FormatterDate } from '../../scripts/FormatterDate';

export default function ListSanctionsReport() {

    const [sanctionsReport, setSanctionsReport] = useState([]);

    useEffect(() => {
        loadSanctionsReport();
    }, []);

    async function loadSanctionsReport() {
        try {
            const response = await getSanctionsReports();
            setSanctionsReport(response);
        } catch (error) {
            console.error('Error trayendo los datos de la api:', error);
        }
    }

    const deletesanctionsReportById = async (id) => {
        deleteSanctionsReport(id).then((result) => {
            loadSanctionsReport();
            console.log(result);
        }).catch(() => {
            console.log("Error al cargar los datos");
        });
    }

    return (
        <div>
            <table className="table mb-5">
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Nombre</th>
                        <th scope='col'>Apellido</th>
                        <th scope='col'>Tipo de sancion</th>
                        <th scope='col'>Fecha de devolucion</th>
                        <th scope='col'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sanctionsReport.filter(sanctionsReport => sanctionsReport.active === true).map((sanctionsReport, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{sanctionsReport.idLibraryUserNavigation.idUserNavigation.name}</td>
                                <td>{sanctionsReport.idLibraryUserNavigation.idUserNavigation.lastName}</td>
                                <td>{sanctionsReport.idSanctionComputerEquipmentNavigation.sanctionType}</td>
                                <td>{FormatterDate(sanctionsReport.idReturnComputerEquipmentNavigation.returnDate)}</td>
                                <td>
                                    <Link type="button" className="btn btn-outline-warning mv+10">Modificar</Link>
                                    <Link type="button" className="btn btn-outline-danger mv-10" onClick={() => deletesanctionsReportById(sanctionsReport.id)}>Eliminar</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table >

            <Link type="button" className="btn btn-outline-primary" to="/AddSanctionsReport">Agregar</Link>
        </div>
    )
}