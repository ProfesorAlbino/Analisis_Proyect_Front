import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateCopy, getById } from '../../service/CopysApi/CopyApi';
import { encryptAES,decryptAES } from '../../scripts/AES-256';


export default function ModifyCopy() {

    const { idTitle } = useParams();

    const [copy, setCopy] = useState({
        id: parseInt(decryptAES(idTitle)),
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
        getById(parseInt(decryptAES(idTitle)))
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
                window.location.href = `/listCopy/${encryptAES(copy.idTitles+"")}`;
            })
            .catch(() => {
                console.log("Error al modificar la copia");
            });
        console.log(copy);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2 className="text-center">Modificar Copia</h2>
                <div className="container py-4">
                    <div className="row">
                        <div className=" visually-hidden mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="number"
                                className="form-control border border-primary"
                                required
                                hidden
                                value={copy.id}
                                onChange={(e) => setCopy({ ...copy, id: e.target.value })}
                            />
                            
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="number"
                                className="form-control border border-primary"
                                required
                                value={copy.sequence}
                                onChange={(e) => setCopy({ ...copy, sequence: e.target.value })}
                            />
                            <label className="form-label ms-2">Secuencia</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                value={copy.barcode}
                                onChange={(e) => setCopy({ ...copy, barcode: e.target.value })}
                            />
                            <label className="form-label ms-2">Código de Barras</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                value={copy.subLibrary}
                                onChange={(e) => setCopy({ ...copy, subLibrary: e.target.value })}
                            />
                            <label className="form-label ms-2">Sub Biblioteca</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                value={copy.description}
                                onChange={(e) => setCopy({ ...copy, description: e.target.value })}
                            />
                            <label className="form-label ms-2">Descripción</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                value={copy.classification}
                                onChange={(e) => setCopy({ ...copy, classification: e.target.value })}
                            />
                            <label className="form-label ms-2">Clasificación</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                value={copy.collection}
                                onChange={(e) => setCopy({ ...copy, collection: e.target.value })}
                            />
                            <label className="form-label ms-2">Colección</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                value={copy.itemStatus}
                                onChange={(e) => setCopy({ ...copy, itemStatus: e.target.value })}
                            />
                            <label className="form-label ms-2">Estado del Item</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                value={copy.notes}
                                onChange={(e) => setCopy({ ...copy, notes: e.target.value })}
                            />
                            <label className="form-label ms-2">Notas</label>
                        </div>
                        <div className="mb-4">
                            <button type="submit" className="btn btn-primary">Modificar Copia</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}