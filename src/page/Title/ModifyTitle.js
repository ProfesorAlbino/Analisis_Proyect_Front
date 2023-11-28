import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getById, updateTitle } from '../../service/TitlesApi/TitleApi';
import { encryptAES, decryptAES } from '../../scripts/AES-256';
import { Toaster, toast } from 'sonner';
import Swal from "sweetalert2";



export default function ModifyTitle() {

    const formatDate = (date) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth()).toString().padStart(2, '0');
        const year = d.getFullYear();

        return `${year}-${month}-${day}`;
    };

    const { idTitle } = useParams();

    const [title, setTitle] = useState({
        id: 0,
        publisherName: '',
        header: '',
        termSubject: '',
        associatedDate: '',
        publicationDate: '',
        number: 0,
        restTitle: '',
        personName: '',
        isbn: '',
        title1: '',
        mentionResponsibility: '',
        information: '',
        generalSubjectSubdivision: '',
        copies: []
    });

    useEffect(() => {
        getById(parseInt(decryptAES(idTitle)))
            .then((result) => {
                result.associatedDate = formatDate(result.associatedDate);
                result.publicationDate = formatDate(result.publicationDate);
                setTitle(result);
            })
            .catch(() => {
                toast.error('Ooops,Algo salió mal');
            });
    }, [idTitle]);

    const handleSubmit = (e) => {
        e.preventDefault();

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
                updateTitle(title)
                    .then((result) => {
                        toast.success('Libro actualizado exitosamente');
                        setTimeout(() => {
                            window.location.href = `/listTitles`;
                        }, 1000);
                    })
                    .catch(() => {
                        toast.error('Ooops,Algo salió mal');
                    });

            } else {

                Swal.fire
                    (
                        'Error',
                        'No se pudo eliminar el Libro.',
                        'error'
                    );

                window.location.href = `/listTitles`;
            }
        })
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2 className="text-center">Modificar Libro</h2>
                <div className="col-4 mb-3">
                    <a href="/listTitles" className="btn btn-primary float-left">Regresar</a>
                </div>
                <div className="container py-4">
                    <div className="row">
                        {/* AUTOR */}
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                value={title.personName}
                                onChange={(e) => setTitle({ ...title, personName: e.target.value })}
                            />
                            <label className="form-label ms-2">Nombre del Autor</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="date"
                                className="form-control border border-primary"
                                required
                                readOnly
                                value={title.associatedDate}
                                onChange={(e) => setTitle({ ...title, associatedDate: e.target.value })}
                            />
                            <label className="form-label ms-2">Fecha asociada al nombre</label>
                        </div>
                        {/* TITULO */}
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                value={title.title1}
                                onChange={(e) => setTitle({ ...title, title1: e.target.value })}
                            />
                            <label className="form-label ms-2">Título del Libro</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                value={title.restTitle}
                                onChange={(e) => setTitle({ ...title, restTitle: e.target.value })}
                            />
                            <label className="form-label ms-2">Resto del título</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                value={title.mentionResponsibility}
                                onChange={(e) => setTitle({ ...title, mentionResponsibility: e.target.value })}
                            />
                            <label className="form-label ms-2">Mención de Responsabilidad</label>
                        </div>
                        {/* PUBLICACION */}
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="Text"
                                className="form-control border border-primary"
                                required
                                value={title.publisherName}
                                onChange={(e) => setTitle({ ...title, publisherName: e.target.value })}
                            />
                            <label className="form-label ms-2">Nombre del Editor</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="date"
                                className="form-control border border-primary"
                                required
                                value={title.publicationDate}
                                onChange={(e) => setTitle({ ...title, publicationDate: e.target.value })}
                            />
                            <label className="form-label ms-2">Fecha de Publicación</label>
                        </div>
                        {/* MATERIA */}
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                value={title.termSubject}
                                onChange={(e) => setTitle({ ...title, termSubject: e.target.value })}
                            />
                            <label className="form-label ms-2">Término de Materia</label>
                        </div>
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                value={title.generalSubjectSubdivision}
                                onChange={(e) => setTitle({ ...title, generalSubjectSubdivision: e.target.value })}
                            />
                            <label className="form-label ms-2">Subdivisión de Materia General</label>
                        </div>
                        {/* ISBN */}
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                value={title.isbn}
                                onChange={(e) => setTitle({ ...title, isbn: e.target.value })}
                            />
                            <label className="form-label ms-2">ISBN</label>
                        </div>
                        {/* CABECERA */}
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                value={title.header}
                                onChange={(e) => setTitle({ ...title, header: e.target.value })}
                            />
                            <label className="form-label ms-2">Cabecera</label>
                        </div>
                        {/* NUMERO */}
                        <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <input
                                type="number"
                                className="form-control border border-primary"
                                required
                                value={title.number}
                                onChange={(e) => setTitle({ ...title, number: e.target.value })}
                            />
                            <label className="form-label ms-2">Número</label>
                        </div>
                        {/* INFORMACION */}
                        <div className="mb-4 form-floating col-12">
                            <input
                                type="text"
                                className="form-control border border-primary"
                                required
                                value={title.information}
                                onChange={(e) => setTitle({ ...title, information: e.target.value })}
                            />
                            <label className="form-label ms-2">Información</label>
                        </div>
                        <div className="mb-4 ml-4">
                            <button type="submit" className="btn btn-primary me-5">Modificar</button>
                            <button type="reset" className="btn btn-warning">Limpiar</button>
                        </div>
                    </div>
                </div>
            </form>
            <Toaster
                richColors
                position="bottom-center" />
        </>
    );
};
