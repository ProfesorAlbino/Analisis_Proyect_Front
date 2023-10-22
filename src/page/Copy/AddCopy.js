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
        notes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createCopy(copy)
            .then((result) => {
                console.log(result + "Libro creado exitosamente");
            })
            .catch(() => {
                console.log("Error al crear el libro");
            });
        console.log(copy);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="form-label">Secuencia</label>
                    <input type="number"
                        className="form-control"
                        required
                        onChange={(e) => setCopy({ ...copy, sequence: e.target.value })} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Código de Barras</label>
                    <input type="text"
                        className="form-control"
                        required
                        onChange={(e) => setCopy({ ...copy, barcode: e.target.value })} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Sub Biblioteca</label>
                    <input type="text"
                        className="form-control"
                        required
                        onChange={(e) => setCopy({ ...copy, subLibrary: e.target.value })} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Descripción</label>
                    <input type="text"
                        className="form-control"
                        required
                        onChange={(e) => setCopy({ ...copy, description: e.target.value })} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Clasificación</label>
                    <input type="text"
                        className="form-control"
                        required
                        onChange={(e) => setCopy({ ...copy, classification: e.target.value })} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Colección</label>
                    <input type="text"
                        className="form-control"
                        required
                        onChange={(e) => setCopy({ ...copy, collection: e.target.value })} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Estado del Item</label>
                    <input type="text"
                        className="form-control"
                        required
                        onChange={(e) => setCopy({ ...copy, itemStatus: e.target.value })} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Notas</label>
                    <input type="text"
                        className="form-control"
                        required
                        onChange={(e) => setCopy({ ...copy, notes: e.target.value })} />
                </div>
                <div className="mb-4">
                <button type="submit" className="btn btn-primary">Agregar Copia</button>
                <button type="reset" className="btn btn-warning">Limpiar</button>
                </div>

            </form>
        </div>
    );
}