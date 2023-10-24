import { React, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateCopy, getById } from '../../service/CopysApi/CopyApi';


export default function ModifyCopy() {

    const { idTitle } = useParams();
    var id = 0;
    // const navigate = useNavigate();

    const [copy, setCopy] = useState({
        id: idTitle,
        idTitles: 0,
        sequence: 0,
        barcode: '',
        subLibrary: '',
        description: '',
        classification: '',
        collection: '',
        itemStatus: '',
        notes: '',
        idTitlesNavigation: null,
        loanBooks: []
    });

    useEffect(() => {
        getById(idTitle)
            .then((result) => {
                setCopy(result);
                console.log(result);
            })
            .catch(() => {
                console.log("Error al obtener los libros");
            });
    }, [idTitle]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateCopy(copy)
            .then((result) => {
                console.log(result + "Copia modificada exitosamente");
                console.log(idTitle);
                window.location.href = `/listCopy/${copy.idTitles}`;
            })
            .catch(() => {
                console.log("Error al modificar la copia");
            });
        console.log(copy);
    }

    return (
        <div>
            <h2 className="text-center">Modificar Copia</h2>
            <div className="container col-6 py-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 form-floating">
                        <input
                            type="number"
                            className="form-control"
                            required
                            hidden
                            value={copy.id}
                            onChange={(e) => setCopy({ ...copy, id: e.target.value })}
                        />
                        <label className="form-label">ID</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input
                            type="number"
                            className="form-control"
                            required
                            value={copy.sequence}
                            onChange={(e) => setCopy({ ...copy, sequence: e.target.value })}
                        />
                        <label className="form-label">Secuencia</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={copy.barcode}
                            onChange={(e) => setCopy({ ...copy, barcode: e.target.value })}
                        />
                        <label className="form-label">Código de Barras</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={copy.subLibrary}
                            onChange={(e) => setCopy({ ...copy, subLibrary: e.target.value })}
                        />
                        <label className="form-label">Sub Biblioteca</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={copy.description}
                            onChange={(e) => setCopy({ ...copy, description: e.target.value })}
                        />
                        <label className="form-label">Descripción</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={copy.classification}
                            onChange={(e) => setCopy({ ...copy, classification: e.target.value })}
                        />
                        <label className="form-label">Clasificación</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={copy.collection}
                            onChange={(e) => setCopy({ ...copy, collection: e.target.value })}
                        />
                        <label className="form-label">Colección</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={copy.itemStatus}
                            onChange={(e) => setCopy({ ...copy, itemStatus: e.target.value })}
                        />
                        <label className="form-label">Estado del Item</label>
                    </div>
                    <div className="mb-4 form-floating">
                        <input
                            type="text"
                            className="form-control"
                            required
                            value={copy.notes}
                            onChange={(e) => setCopy({ ...copy, notes: e.target.value })}
                        />
                        <label className="form-label">Notas</label>
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="btn btn-primary">Modificar Copia</button>
                    </div>
                </form>

            </div>
        </div>
    );
}