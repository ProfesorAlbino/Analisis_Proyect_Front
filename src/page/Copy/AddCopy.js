import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createCopy } from '../../service/CopysApi/CopyApi';


export default function AddCopy() {

    const { idTitle } = useParams();

    const [copy, setCopy] = useState({
        id: 0,
        idTitles: idTitle,
        sequence: 0,
        barcode: '',
        subLibrary: '',
        description: '',
        classification: '',
        collection: '',
        itemStatus: '',
        notes: '',
        active: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createCopy(copy)
            .then((result) => {
                console.log(result + "Libro creado exitosamente");
                window.location.href = `/listCopy/${idTitle}`;
            })
            .catch(() => {
                console.log("Error al crear el libro");
            });
        console.log(copy);
    }

    return (
        <div>
            <h2 className="text-center">Registrar Copia</h2>
            <div className="container col-6 py-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 form-floating">
                        <input
                            type="number"
                            className="form-control"
                            required
                            onChange={(e) => setCopy({ ...copy, sequence: e.target.value })}
                        />
                        <label className="form-label">Secuencia</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input
                            type="text"
                            className="form-control"
                            required
                            onChange={(e) => setCopy({ ...copy, barcode: e.target.value })}
                        />
                        <label className="form-label">Código de Barras</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input
                            type="text"
                            className="form-control"
                            required
                            onChange={(e) => setCopy({ ...copy, subLibrary: e.target.value })}
                        />
                        <label className="form-label">Sub Biblioteca</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input
                            type="text"
                            className="form-control"
                            required
                            onChange={(e) => setCopy({ ...copy, description: e.target.value })}
                        />
                        <label className="form-label">Descripción</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input
                            type="text"
                            className="form-control"
                            required
                            onChange={(e) => setCopy({ ...copy, classification: e.target.value })}
                        />
                        <label className="form-label">Clasificación</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input
                            type="text"
                            className="form-control"
                            required
                            onChange={(e) => setCopy({ ...copy, collection: e.target.value })}
                        />
                        <label className="form-label">Colección</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input
                            type="text"
                            className="form-control"
                            required
                            onChange={(e) => setCopy({ ...copy, itemStatus: e.target.value })}
                        />
                        <label className="form-label">Estado del Item</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input
                            type="text"
                            className="form-control"
                            required
                            onChange={(e) => setCopy({ ...copy, notes: e.target.value })}
                        />
                        <label className="form-label">Notas</label>
                    </div>
                    <div className="mb-4 ml-4">
                        <button type="submit" className="btn btn-primary me-5">Agregar Copia</button>
                        <button type="reset" className="btn btn-warning">Limpiar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}