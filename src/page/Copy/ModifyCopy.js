import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateCopy, getById } from '../../service/CopysApi/CopyApi';
import { encryptAES, decryptAES } from '../../scripts/AES-256';
import { Toaster, toast } from 'sonner';
import Swal from "sweetalert2";

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
            })
            .catch(() => {
                toast.error('Ooops,Algo salió mal');
            });
    }, [idTitle]);

    const handleSubmit = (e) => {

        Swal.fire({
            title: '¿Estás seguro de Modificar el Libro?',
            text: "No podrás revertir esto.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Modifícalo!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                updateCopy(copy)
                    .then((result) => {
                        toast.success('Copia actualizada exitosamente');
                        setTimeout(() => {
                            window.location.href = `/listCopy/${encryptAES(copy.idTitles + "")}`;
                        }, 1000);
                    })
                    .catch(() => {
                        toast.error('Ooops,Algo salió mal');
                    });
            } 
        })


        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2 className="text-center">Modificar Copia</h2>
                <div className="col-4">
                    <a href={`/listCopy/${encryptAES(copy.idTitles + "")}`} className="btn btn-primary float-left">Regresar</a>
                </div>
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
            <Toaster 
            richColors
            position='bottom-center'/>
        </div>
    );
}