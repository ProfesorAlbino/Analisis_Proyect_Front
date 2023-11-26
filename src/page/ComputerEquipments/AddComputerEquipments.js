import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addComputerEquipment } from "../../service/ComputerEquipment/ComputerEquipmentApi";
import { verifyComponent, verifySerialNumber, verifyPlate } from "./verifyAddComputerEquipments";
import Swal from 'sweetalert2'

import '../../css/ComputerEquipments/verifyComputerEquipments.css';

export default function AddComputerEquipments() {
    const [computerEquipment, setComputerEquipment] = useState({
        licensePlate: '',
        class: '',
        name: '',
        brand: '',
        model: '',
        state: '',
        observations: '',
        include: '',
        lastModification: '',
        serialNumber: '',
        entryDate: '',
        LoanComputerEquipments: [],
        ReturnComputerEquipments: []
    });

    const { licensePlate, clas, name, brand, model, state, observations, include, serialNumber } = computerEquipment;

    const onSubmit = (event) => {
        event.preventDefault();

        if (verifyComponent()) {
            if (computerEquipment.observations === '') {
                computerEquipment.observations = 'No posee observaciones';
            }

            if (computerEquipment.include === '') {
                computerEquipment.include = 'No posee incluido';
            }

            // if (verifySerialNumber(computerEquipment.serialNumber) === false & verifyPlate(computerEquipment.licensePlate) === false) {
             
                
            // }

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Registro Guardado",
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                addComputerEquipment(computerEquipment);
                window.location.href = '/ListComputerEquipments';
              });
        }
    }

    return (
        <div>
            <h1>Agregar Equipo Informatico</h1>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="row">
                    <div className="col-md-4 mb-3">
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="row">
                            <div className="col-md-6 mb-1">
                                <div className="form-group mb-2">
                                    <label className="warning" id="label_licensePlate"></label>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="licensePlate" value={licensePlate}
                                            onChange={(event) => setComputerEquipment({ ...computerEquipment, licensePlate: event.target.value })} />
                                        <label htmlFor="licensePlate">Placa</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-1">
                                <div className="form-group mb-3">
                                    <label className="warning" id="label_class"></label>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="class" value={clas}
                                            onChange={(event) => setComputerEquipment({ ...computerEquipment, clas: event.target.value })} />
                                        <label htmlFor="class">Clase</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-1">
                                <div className="form-group mb-3">
                                    <label className="warning" id="label_name"></label>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="name" value={name}
                                            onChange={(event) => setComputerEquipment({ ...computerEquipment, name: event.target.value })} />
                                        <label htmlFor="name">Nombre</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-1">
                                <div className="form-group mb-3">
                                    <label className="warning" id="label_brand"></label>
                                    <div className="form-floating">
                                        <input type text className="form-control" id="brand" value={brand}
                                            onChange={(event) => setComputerEquipment({ ...computerEquipment, brand: event.target.value })} />
                                        <label htmlFor="brand">Marca</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-1">
                                <div className="form-group mb-3">
                                    <label className="warning" id="label_model"></label>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="model" value={model}
                                            onChange={(event) => setComputerEquipment({ ...computerEquipment, model: event.target.value })} />
                                        <label htmlFor="model">Modelo</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-1">
                                <div className="form-group mb-3">
                                    <label className="warning" id="label_state"></label>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="state" value={state}
                                            onChange={(event) => setComputerEquipment({ ...computerEquipment, state: event.target.value })} />
                                        <label htmlFor="state">Condicion</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-1">
                                <div className="form-group mb-3">
                                    <label className="warning" id="label_observations"></label>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="observations" value={observations}
                                            onChange={(event) => setComputerEquipment({ ...computerEquipment, observations: event.target.value })} />
                                        <label htmlFor="observations">Observaciones</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-1">
                                <div className="form-group mb-3">
                                    <label className="warning" id="label_include"></label>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="include" value={include}
                                            onChange={(event) => setComputerEquipment({ ...computerEquipment, include: event.target.value })} />
                                        <label htmlFor="include">Incluir</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 mb-1">
                                <div className="form-group mb-3">
                                    <label className="warning" id="label_serialNumber"></label>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="serialNumber" value={serialNumber}
                                            onChange={(event) => setComputerEquipment({ ...computerEquipment, serialNumber: event.target.value })} />
                                        <label htmlFor="serialNumber">Número de Serie</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
                <Link type="button" className="btn btn-danger" to="/ListComputerEquipments">Cancelar</Link>
            </form>
        </div>
    )
}
