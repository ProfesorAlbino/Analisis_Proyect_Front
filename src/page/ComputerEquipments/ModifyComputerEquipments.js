import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { updateComputerEquipment } from "../../service/ComputerEquipment/ComputerEquipmentApi";

export default function ModifyComputerEquipments() {
    const computerEquipment = JSON.parse(localStorage.getItem('computerEquipment'));
    console.log(computerEquipment);

    const [formData, setFormData] = useState(computerEquipment);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    function save() {
        localStorage.removeItem('computerEquipment');
        updateComputerEquipment(formData)
        window.location.href = '/ListComputerEquipments';
    }

    return (
        <div>
            <h1>Modificar Equipo Informatico</h1>
            <form>
                <div className="form-group mb-3">
                    <label htmlFor="licensePlate">Placa</label>
                    <input type="text" className="form-control" id="licensePlate" onChange={handleInputChange} value={formData.licensePlate}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="class">Clase</label>
                    <input type="text" className="form-control" id="class" onChange={handleInputChange} value={formData.class} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" className="form-control"  onChange={handleInputChange} id="name" value={formData.name} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="brand">Marca</label>
                    <input type="text" className="form-control" onChange={handleInputChange} id="brand" value={formData.brand} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="model">Modelo</label>
                    <input type="text" className="form-control" onChange={handleInputChange} id="model" value={formData.model} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="state">Estado</label>
                    <input type="text" className="form-control" onChange={handleInputChange} id="state" value={formData.state} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="observations">Observaciones</label>
                    <input type="text" className="form-control" onChange={handleInputChange} id="observations" value={formData.observations} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="include">Incluir</label>
                    <input type="text" className="form-control" onChange={handleInputChange} id="include" value={formData.include} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="serialNumber">Número de Serie</label>
                    <input type="text" className="form-control" onChange={handleInputChange} id="serialNumber" value={formData.serialNumber} />
                </div>
                <Link type="button" className="btn btn-primary" onClick={()=> save()}>Guardar</Link>
                <Link type="button" className="btn btn-danger" to="/AddComputerEquipments">Cancelar</Link>
            </form>
        </div>
    );
}