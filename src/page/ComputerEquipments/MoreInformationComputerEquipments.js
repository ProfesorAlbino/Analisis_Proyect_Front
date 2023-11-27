import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function MoreInformationComputerEquipments() {
    const computerEquipment = JSON.parse(localStorage.getItem('computerEquipment'));
    console.log(computerEquipment);

    const [formData, setFormData] = useState(computerEquipment);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };


    return (
        <div>
            <h1>Informacion</h1>
                <div className="row">
                    <div className="col-md-4 mb-3">
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <div className="form-group mb-3">
                                    <div class="form-floating">
                                        <input type="text" readOnly className="form-control" id="licensePlate" onChange={handleInputChange} value={formData.licensePlate} />
                                        <label htmlFor="licensePlate">Placa</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <div className="form-group mb-3">
                                    <div class="form-floating">
                                        <input type="text" readOnly className="form-control" id="class" onChange={handleInputChange} value={formData.class} />
                                        <label htmlFor="class">Clase</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <div className="form-group mb-3">
                                    <div class="form-floating">
                                        <input type="text" readOnly className="form-control" onChange={handleInputChange} id="name" value={formData.name} />
                                        <label htmlFor="name">Nombre</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <div className="form-group mb-3">
                                    <div class="form-floating">
                                        <input type="text" readOnly className="form-control" onChange={handleInputChange} id="brand" value={formData.brand} />
                                        <label htmlFor="brand">Marca</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <div className="form-group mb-3">
                                    <div class="form-floating">
                                        <input type="text" readOnly className="form-control" onChange={handleInputChange} id="model" value={formData.model} />
                                        <label htmlFor="model">Modelo</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <div className="form-group mb-3">
                                    <div class="form-floating">
                                        <input type="text" readOnly className="form-control" onChange={handleInputChange} id="state" value={formData.state} />
                                        <label htmlFor="state">Estado</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <div className="form-group mb-3">
                                    <div class="form-floating">
                                        <input type="text" readOnly className="form-control" onChange={handleInputChange} id="observations" value={formData.observations} />
                                        <label htmlFor="observations">Observaciones</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <div className="form-group mb-3">
                                    <div class="form-floating">
                                        <input type="text" readOnly className="form-control" onChange={handleInputChange} id="include" value={formData.include} />
                                        <label htmlFor="include">Incluir</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 mb-3">
                                <div className="form-group mb-3">
                                    <div class="form-floating">
                                        <input type="text" readOnly className="form-control" onChange={handleInputChange} id="serialNumber" value={formData.serialNumber} />
                                        <label htmlFor="serialNumber">Número de Serie</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                    </div>
                </div>

                <Link type="button" className="btn btn-primary" to="/ListComputerEquipments">Regresar</Link>
        </div>
    );
}