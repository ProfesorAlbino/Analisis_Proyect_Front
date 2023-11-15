import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addComputerEquipment } from "../../service/ComputerEquipment/ComputerEquipmentApi";

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
        addComputerEquipment(computerEquipment);
        window.location.href = '/ListComputerEquipments';
    }

    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group mb-3">
                    <label htmlFor="licensePlate">Placa</label>
                    <input type="text" className="form-control" id="licensePlate" value={licensePlate} 
                    onChange={(event) => setComputerEquipment({ ...computerEquipment, licensePlate: event.target.value })}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="class">Clase</label>
                    <input type="text" className="form-control" id="class" value={clas} 
                    onChange={(event) => setComputerEquipment({ ...computerEquipment, clas: event.target.value })}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" className="form-control" id="name" value={name}
                    onChange={(event) => setComputerEquipment({ ...computerEquipment, name: event.target.value })}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="brand">Marca</label>
                    <input type text className="form-control" id="brand" value={brand}
                    onChange={(event) => setComputerEquipment({ ...computerEquipment, brand: event.target.value })}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="model">Modelo</label>
                    <input type="text" className="form-control" id="model" value={model}
                    onChange={(event) => setComputerEquipment({ ...computerEquipment, model: event.target.value })}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="state">Estado</label>
                    <input type="text" className="form-control" id="state" value={state}
                    onChange={(event) => setComputerEquipment({ ...computerEquipment, state: event.target.value })}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="observations">Observaciones</label>
                    <input type="text" className="form-control" id="observations" value={observations} 
                    onChange={(event) => setComputerEquipment({ ...computerEquipment, observations: event.target.value })}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="include">Incluir</label>
                    <input type="text" className="form-control" id="include" value={include}
                    onChange={(event) => setComputerEquipment({ ...computerEquipment, include: event.target.value })}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="serialNumber">Número de Serie</label>
                    <input type="text" className="form-control" id="serialNumber" value={serialNumber} 
                    onChange={(event) => setComputerEquipment({ ...computerEquipment, serialNumber: event.target.value })}/>
                </div>

                <button type="submit" className="btn btn-primary">Guardar</button>
                <Link type="button" className="btn btn-danger" to="/AddComputerEquipments">Cancelar</Link>
            </form>
        </div>
    )
}
